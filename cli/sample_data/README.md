# Generating sample data

In order to generate real historial stock data for demonstrating graphing capability we can use the following workflow

## google sheets

use google sheets function to fetch stock tick data as follows:


```python
=GOOGLEFINANCE("ASX:<stock-code>", "price", "[start-date]", "[end-date]", "DAILY")
```

copy the output into the data files in the data/ directory. Once there we can run the JSON generator script which will create JSON fixtures to be used by the React webapp as follows:

## install packages

```bash
pip install virtualenv
virtualenv -p `which python3` ./env
source env/bin/activate
```
## run tool
```sh
(env)python3 gen_json.py -f ../data -s ../src/fixtures/topShorts.json
```

or from npm at the project top level:

```bash
npm run genFixtures
```

where the gen_json.py cli has the following options:

```bash
usage: gen_json.py [-h] [-f FOLDER] [-s SAVE] process stock data and generate fixtures for sample use

optional arguments:
  -h, --help            show this help message and exit
  -f FOLDER, --folder FOLDER
                        folder to find parsable files
  -s SAVE, --save SAVE  save file
```