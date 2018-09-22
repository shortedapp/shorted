import csv


class CSV(object):
    """
    Manages the parsing and writing of CSV data
    """

    def __init__(self, file_name):
        self.file_name = file_name
        self.data = None
        with open(file_name) as fp:
            self.length = sum(1 for row in fp)

    def read(self):
        """
        read data into memory datastructure (dict)
        """
        return csv.reader(open(self.file_name))
