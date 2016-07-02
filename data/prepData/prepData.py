import xlrd
import numpy as np
import pprint

import codecs
import json
from datetime import datetime
import os


states = {
    'New South Wales': 'NSW',
    'Victoria': 'VIC',
    'Queensland': 'QLD',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Tasmania': 'TAS',
    'Australian Capital Territory': 'ACT',
    'Northern Territory': 'NT'
}

sectors = {
    'Aged care facilities': 'Aged care facilities',
    'Agricultural and aquacultural buildings': 'Agricultural',
    'Commercial Buildings - Total': 'Commercial',
    'Commercial buildings n.e.c.': 'Commercial',
    'Education buildings': 'Education',
    'Entertainment and recreation buildings': 'Recreation',
    'Factories and other secondary production buildings': 'Industrial',
    'Health buildings': 'Health',
    'Industrial Buildings - Total': 'Industrial',
    'Offices': 'Offices',
    'Other Non-residential - Total': 'Other',
    'Other industrial buildings n.e.c.': 'Industrial',
    'Other non-residential n.e.c.': 'Other',
    'Religion buildings': 'Religion',
    'Retail and wholesale trade buildings': 'Retail',
    'Short term accommodation buildings': 'Accommodation',
    'Total Non-residential': 'Other',
    'Transport buildings': 'Transport',
    'Warehouses': 'Warehouses'


}


def find_xls_filenames(suffix=".xls" ):
    filenames = os.listdir('./')
    return [ filename for filename in filenames if filename.endswith(suffix)]


def parse_file(datafile):
    workbook = xlrd.open_workbook(datafile)
    sheet = workbook.sheet_by_index(1)
    fields = []
    state = ""
    num_cols = sheet.ncols
    data = []
    for row_idx in range(10, sheet.nrows):
        cell_obj = sheet.cell(row_idx, 0)
        month = xlrd.xldate_as_tuple(cell_obj.value,0)
        dt_obj = datetime(*month[0:6])
        month_string =  dt_obj.strftime("%Y-%m-%d")

        for col_idx in range(37, num_cols - 1):

            cell_obj = sheet.cell(0, col_idx) 
            title = cell_obj.value.split(' ; ')
            field_name = title[3].replace(' ;','').strip()
            sector = sectors[field_name]
            state = states[title[1].strip()]
            value = sheet.cell(row_idx, col_idx).value
            if value == "":
                value = 0
            item = {'state': state,
                'period':month_string,
                'sector': sector,
                'value': value * 1000}
            data.append(item)
    return data



def getData():
    filenames = find_xls_filenames()
    results = []
    for fn in filenames:
        data = parse_file(fn)
        results = results + data
    return results

def getStates():
    stateList = []
    for key in states:
        item = {'state': key, 'short_name': states[key]}
        stateList.append(item)
    return stateList


data = getData()
file_out = "{0}.json".format("data")
with open(os.path.join(os.pardir, file_out), "w") as outfile:
    json.dump(data, outfile, indent=4)

stateList = getStates()
file_out = "{0}.json".format("states")
with open(os.path.join(os.pardir, file_out), "w") as outfile:
    json.dump(stateList, outfile, indent=4)