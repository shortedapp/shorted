from lib import utils
from lib import elasticsearch
from lib import csvmanager
from lib.exceptions import FailedToGetIndex
import argparse
import os
import imp

try:
    imp.find_module('tqdm')
    import tqdm

    loading_bar = True
except ImportError:
    loading_bar = False


class DBManager(object):
    """
    Top level class for managing the conversion/ingestion of data into elasticsearch
    """

    def __init__(self, config, mode="DRY", remote=False):
        self.mode = mode
        self.config = config
        if self.config['source'].get('csv'):
            self.csvMetadata = self.config['source']['csv']
            self.csvData = csvmanager.CSV(self.csvMetadata['path'])
        if self.config['destination'].get('elasticsearch'):
            self.elasticsearchClient = elasticsearch.ElasticsearchIndex(self.config['destination']['elasticsearch'])
            self.index = self.config['destination']['elasticsearch']['index']

    def display_information(self):
        """
        Display information about available data
        :return:
        """
        total_items = self.mongoClient.total_items
        print("Total Items in available data: {}".format(total_items))

    def index_companies(self):
        """
        Index the available data from a given data source (JSON dump, mongodb etc)
        :return:
        """
        index_name = self.indexes['names']['name']
        if not self.elasticsearchClient.get_index(index_name):
            self.elasticsearchClient.create_index(index_name)
        if loading_bar:
            for record in tqdm.tqdm(self.csvMetadata.read(),
                                    total=self.csvData.length,
                                    unit='Companies'):
                print(record)
                # self.elasticsearchClient.add_record(record, index_name=index_name, type='company')
        else:
            for record in self.mongoClient.parseCollections():
                pass
        if self.proxy:
            self.ssh.stop_tunnel()

    def reindex_companies(self):
        """
        Effectively reformat elasticsearch index
        :return:
        """
        self.reconfigure_companies_index()
        self.index_companies()

    def configure_index(self):
        """
        Configure elasticsearch index before indexing, configuration will be applied as documents are indexed
        :return:
        """
        self.elasticsearchClient.create_index()



def main():
    parser = argparse.ArgumentParser(prog='dbmanager.py', usage='%(prog)s [options]',
                                     description='''tool for managing the conversion of raw data in different formats 
                                     into elasticsearch''',
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-c', '--config', dest='config',
                        default="{}/{}".format('${PWD}', 'config.yml'),
                        help='specify a config file path to use for the cli/daemon')
    parser.add_argument('-in', '--index-companies', dest='ic', action='store_true',
                        help='index available names in data')
    parser.add_argument('-rin', '--re-index-companies', dest='ric', action='store_true',
                        help='re-index available names in data')
    parser.add_argument('-d', '--display', dest='display', action='store_true',
                        help='display information about available data sets')

    args = vars(parser.parse_args())
    if 'PWD' in args['config']:
        config = utils.load_config(os.path.join(os.path.dirname(__file__), 'config', 'config.yaml'))
    else:
        config = utils.load_config(args['config'])
    if not config:
        raise Exception("EXITING:FAILED_TO_LOAD_CONFIG")
    manager = DBManager(config)

    if args['ic']:
        manager.index_companies()
    if args['ric']:
        manager.reindex_companies()
    if args['display']:
        manager.display_information()


if __name__ == "__main__":
    main()
