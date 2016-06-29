import xlrd
import numpy as np
import pprint

import codecs
import json
from datetime import datetime


from os import listdir



def find_xls_filenames(suffix=".xls" ):
    filenames = listdir('./')
    return [ filename for filename in filenames if filename.endswith( suffix ) ]


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
            state = title[1].strip()
            value = sheet.cell(row_idx, col_idx).value
            if value == "":
                value = 0
            item = {'state': state, 'period':month_string, 'sector': field_name, 'value': value}
            data.append(item)
    return data



def getData():
    filenames = find_xls_filenames()
    results = []
    for fn in filenames:
        data = parse_file(fn)
        results = results + data
    return results



data = getData()
file_out = "{0}.json".format("data")
with open(file_out, 'w') as outfile:
    json.dump(data, outfile, indent=4)

