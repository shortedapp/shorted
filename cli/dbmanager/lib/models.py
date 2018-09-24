import json


class Company(object):
    """
    Model which represents the data structure within the CSV row
    """

    def __init__(self, headers, item):
        self.name = None
        self.code = None
        self.industry = None
        setattr(self, headers[0], item[0])
        setattr(self, headers[1], item[1])
        setattr(self, headers[2], item[2])
        self.item = item

    def get_name(self):
        return self.name

    def get_id(self):
        return self.code

    def get_code(self):
        return self.code

    def get_industry(self):
        return self.industry

    def get_indexable_document(self):

        return json.dumps({
            'name': self.get_name(),
            'code': self.get_code(),
            'industry': self.get_industry()
        })

    def get_json(self):
        return {
            'name': self.get_name(),
            'code': self.get_code(),
            'industry': self.get_industry()
        }

    def __repr__(self):
        return self.item

    def __str__(self):
        return "name: {name}, code: {code}, industry: {industry}".format(
            name=self.get_name(),
            code=self.get_code(),
            industry=self.get_industry()
        )
