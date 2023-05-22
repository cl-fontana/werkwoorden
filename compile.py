#! /usr/bin/env python3

# Copyright (C) 2023, European Union, Cristiano L. Fontana
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program. If not, see <https://www.gnu.org/licenses/>.

import csv
import json
import re

csv_file_name = "onregelmatige werkwoorden.csv"
json_file_destination = "src/verba.json"
html_file_source = "src/index.html"
html_file_destination = "dist/index.html"

print("Opening CSV file: {}".format(csv_file_name))

with open(csv_file_name, "r") as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter = ',', quotechar = '"')

    rows = list()

    for row_dict in csv_reader:
        # Clear the empty field in the entry
        row_dict.pop("")

        for key, value in row_dict.items():
            # Try to convert the value to a number
            try:
                if "." not in value:
                    row_dict[key] = int(value)
                else:
                    row_dict[key] = float(value)
            # If the value cannot be converted to a number, leave it as a string
            except ValueError:
                row_dict[key] = value.strip()

        try:
            if row_dict["select"] > 0:
                rows.append(row_dict)
        except:
            pass

    print("Found {:d} selected verba".format(len(rows)))

    print("Opening the JSON destination file: {}".format(json_file_destination))

    with open(json_file_destination, "w") as json_file:
        json.dump(rows, json_file, indent=4)

print("Opening the HTML source file: {}".format(html_file_source))

with open(html_file_source, "r") as html_file:
    html_content = html_file.read()

    # Find all the templates that match the pattern "{{{filename.extension}}}"
    templates = re.findall("{{{\w+.\w+}}}", html_content)

    for template in templates:
        print("Found template: {}".format(template))

        filename = "src/" + template.replace("{{{", "").replace("}}}", "")

        print("    File name: {}".format(filename))

        with open(filename, "r") as input_file:
            file_content = input_file.read()
            html_content = html_content.replace(template, file_content)

    print("Opening the HTML destination file: {}".format(html_file_destination))

    with open(html_file_destination, "w") as output_file:
        output_file.write(html_content)
