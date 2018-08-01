import json
import argparse
import os

loading_bar = False
try:
    from tqdm import tqdm
    loading_bar = True
except:
    loading_bar = False

def parse_txt(path):
    """
    parse space seperated file into json
    assumes the format
    Date	Close
    02/01/2018 16:00:00	3.66
    03/01/2018 16:00:00	3.66
    ..      ..
    """
    dates = []
    values = []
    with open(path, 'r') as f:
        f.readline() # skip first line
        for line in f:
            split = line.split()
            dates.append(' '.join(split[0:1]))
            values.append(float(split[-1]))
            
    return {
        "dates": dates,
        "values": values,
    }



# TODO:
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='process stock data and generate fixtures for sample use')
    parser.add_argument('-f','--folder', dest='folder', help='folder to find parsable files')
    parser.add_argument('-s', '--save', dest='save', help='save file')
    args = parser.parse_args()
    fixture_dict = {}
    for data_file in os.listdir(args.folder):
        file_path = os.path.join(args.folder, data_file)
        fixture_dict[data_file.split('.')[0].upper()] = parse_txt(file_path)
    output = []
    if loading_bar:
        for index, date in tqdm(enumerate(fixture_dict[list(fixture_dict.keys())[0]]['dates'])):
            item = dict()
            item['date'] = date
            for key in fixture_dict.keys():
                item[key] = fixture_dict[key]['values'][index] if (index < len(fixture_dict[key]['values'])) else None
            output.append(item)
    else:
        for index, date in enumerate(fixture_dict[list(fixture_dict.keys())[0]]['dates']):
            item = dict()
            item['date'] = date
            for key in fixture_dict.keys():
                item[key] = fixture_dict[key]['values'][index] if (index < len(fixture_dict[key]['values'])) else None
            output.append(item)

    with open(args.save, 'w') as f:
        json.dump(output, f)
    print("sample data successfully generated, found: {}/{}".format(os.getcwd(), args.save))

