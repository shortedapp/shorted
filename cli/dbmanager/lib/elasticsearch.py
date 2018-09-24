import json
import inspect
import os
from requests import Request, Session


from .utils import load_mapping, load_index_properties
from .exceptions import UnableToLoadMapping, UnableToLoadProperties, FailedToCreateIndex, FailedToDeleteIndex, \
    FailedToIndexRecord


from .models import Company


class ElasticsearchIndex(object):
    """
    Elasticsearch management class
    """

    def __init__(self, config):
        self.config = config
        self.host = config['host'] if config.get('port') else 'localhost'
        self.port = config['port'] if config.get('port') else '9200'
        self.xpack = config['xpack'] if config.get('xpack') else False
        if self.xpack:
            self.username = config['username'] if config.get(
                'username') else 'elastic'
            self.password = config['password'] if config.get(
                'password') else 'changeme'
        self.index_name = config['index']['name'] if config.get(
            'index') else 'companies'
        self.type = 'companies'
        self.mappings = dict()
        self.session = None
        self.secure = config['secure'] if config.get('secure') else False
        self.scheme = 'https' if self.secure else 'http'
        self.prefix = config['prefix'] if config.get('prefix') else ''
        self.index_mapping_dir = config['index']['mapping_dir'] \
            if config.get('index') else \
            os.path.dirname(os.path.dirname(__file__))
        self.properties_path = config['properties_dir'] \
            if config.get('properties_dir') else \
            os.path.join(os.path.dirname(os.path.dirname(__file__)),
                         'config', 'elasticsearch.properties.json')

        self.url = '{scheme}://{host}:{port}{prefix}'.format(scheme=self.scheme, host=self.host, port=self.port,
                                                             prefix='/' + self.prefix if self.prefix else '')
        self.load_mapping_config()
        try:
            self.properties = load_index_properties(self.properties_path)
        except Exception:
            raise UnableToLoadProperties(self.properties_path)

    def load_mapping_config(self, config_dir=None):
        config_path = os.path.join('config', config_dir if config_dir else self.index_mapping_dir,
                                   self.config['index']['mapping_file'])
        try:
            self.mappings[self.config['index']['name']
                          ] = load_mapping(config_path)
        except Exception:
            UnableToLoadMapping(config_path)
        return self.mappings

    def create_session(self):
        self.session = Session()
        if self.xpack:
            self.session.auth = (self.username, self.password)

    def add_record(self, record, index_name=None, type=None):
        """
        Add record to the target elasticsearch index
        :param Record record:
        :return:
        """
        if not isinstance(record, Company):
            raise Exception('invalid input during add_record')
        path = "{url}/{index}/doc/{id}".format(url=self.url,
                                               index=index_name if index_name else self.index_name,
                                               id=record.get_id())
        if not self.session:
            self.create_session()
        headers = {'content-type': 'application/json',
                   'Accept': 'application/json'}
        request = Request('PUT',
                          path,
                          data=record.get_indexable_document(),
                          headers=headers)
        prepped = self.session.prepare_request(request)
        response = self.session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToIndexRecord(response, record)
        else:
            return True

    def delete_index(self, index_name=None):
        """
        Removes a given elasticsearch index
        :return:
        """
        path = "{url}/{index}".format(url=self.url,
                                      index=self.index_name if not index_name else index_name)
        if not self.get_index(index_name):
            return True
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        headers = {'content-type': 'application/json',
                   'Accept': 'application/json'}
        request = Request('DELETE', path, headers=headers)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToDeleteIndex(response)
        else:
            return True

    def get_index(self, index_name):
        """
        fetch index information
        :return:
        """
        path = "{url}/{index}".format(url=self.url,
                                      index=index_name if index_name else self.index_name)
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        headers = {'content-type': 'application/json',
                   'Accept': 'application/json'}
        request = Request('GET', path, headers=headers)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code == 200:
            return response.json()

        elif response.status_code == 404:
            return False

    def recreate_index(self, index_name=None):
        if self.get_index(index_name):
            self.delete_index(index_name)
        return self.create_index(index_name)

    def create_index(self, index_name=None, reindex=False):
        """
        Create the elasticsearch index with the correct configuration/properties for the data we will ingest
        This configured properties such as n-grams, splices and tuples to enable an "elasticsearch" or autocomplete
        like effect. Additionally enables the fully feature set of elasticsearch to rank results based on
        relevance.
        :return:
        """
        if self.get_index(index_name) and not reindex:
            return
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        request = self._create_index_request(index_name)
        print(request.data)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToCreateIndex(response)
        else:
            return True

    def _create_index_request(self, index_name=None):
        """
        Generate request for creating index with desired properties
        """
        path = "{url}/{index_name}".format(
            url=self.url, index_name=index_name if index_name else self.index_name)

        def props(x): return self.properties[x] if self.properties.get(
            x) else None
        headers = {'content-type': 'application/json',
                   'Accept': 'application/json'}
        body = {"settings": {}}
        if self.properties:
            if props("index"):
                body["settings"]["index"] = props("index")
            if props("analysis"):
                body["settings"]["analysis"] = props("analysis")
            if props("similarity"):
                body["settings"]["similarity"] = props("similarity")
        if self.mappings[index_name if index_name else 'names']:
            body["mappings"] = {'doc': self.mappings[index_name]['mappings']}
        body = json.dumps(body)
        request = Request('PUT', path, data=body, headers=headers)
        return request
