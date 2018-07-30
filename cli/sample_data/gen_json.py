import json
import argparse
import os

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




if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='process stock data and generate fixtures for sample use')
    parser.add_argument('-f','--folder', dest='folder', help='folder to find parsable files')
    parser.add_argument('-s', '--save', dest='save', help='save file')
    args = parser.parse_args()
    fixture_dict = {}
    for data_file in os.listdir(args.folder):
        file_path = os.path.join(args.folder, data_file)
        print("parsing {}".format(file_path))
        fixture_dict[data_file.split('.')[0].upper()] = parse_txt(file_path)
    with open(args.save, 'w') as f:
        json.dump(fixture_dict, f)
        # print(json.dumps(parse_txt(args.file), sort_keys=True, indent=4))

