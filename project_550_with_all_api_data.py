# -*- coding: utf-8 -*-
"""Project 550 With All API Data

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/14g92k0JC8O3Tn3gMhmOE-NKGNGcbFKLv
"""

from google.colab import drive
drive.mount('/content/drive')

import pandas as pd
artworks_df = pd.read_csv('/content/drive/MyDrive/550/artworks_2.csv')

artworks_df.head(10)

artworks_df.shape

"""# **IMAGE GALLERY FROM 2ND DATESET**"""

image_gallery_df= pd.read_excel('/content/drive/MyDrive/550/catalog.xlsx')

filtered_df = image_gallery_df[image_gallery_df['LOCATION'].str.contains('Chicago')]
filtered_df

"""# Bio Data From 2nd Dataset (see project [proposal](https://docs.google.com/document/d/1QFxedezToCuRWx6H3fZDayxIJJG7Za4Ow6Ldsw5o_x0/edit) to refresh memory)"""

bio_df = pd.read_excel('/content/drive/MyDrive/550/bio_catalog.xlsx')

bio_df.head(10)
# bio_df.shape

bio_df_countries = bio_df[["SCHOOL"]]

bio_df_countries = bio_df_countries.drop_duplicates()

bio_df_countries.sort_values(by = "SCHOOL", ascending = True)



"""#The Fields section will be important to distinguish the significance of columns in the dataset.
##Linked here https://api.artic.edu/docs/#artworks-2

We can use `longitude` and `latitiude` field to map a artwork to a location on a world map.

For all of the different json folders we can aggregate them into a big json file or read the files and write into one large CSV file. Import the file into Datagrip and connect to a RDS instance and host our data on AWS with the $100 learner credit. Then we should be able to perform queries similar to hw1

See example of this below for artworks folder

Perhaps we can store sql queries on github as txt files and name them as the function of the query like getArtists, getArtworks, and so on. Then for the front end scripts we store on github as well. As long as we delegate tasks properly we shouldn't run into github conflicts with pull request.
"""

import os
import csv
import json

def merge_json_files(folder_path):
    merged_data = []
    count = 1
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            with open(os.path.join(folder_path, filename), 'r') as file:
                data = json.load(file)
                # appends data from a single json to a list
                merged_data.append(data)
                count += 1
                print(count)

    return merged_data

def save_to_csv(data, output_file):
    if not data:
        print("Merge data is empty")
        return
     # extracts all unique keys from the records
    fieldnames = set().union(*(d.keys() for d in data))

    # writes data to CSV file
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

if __name__ == "__main__":
    # specify paths and filenames
    json_folder_path = '/Users/daunel/Desktop/CIT /550 Project/artic-api-data/json/artworks'
    output_filename = '/Users/daunel/Desktop/CIT /550 Project/artic-api-data/Artworks.csv'


    merged_data = merge_json_files(json_folder_path)


    save_to_csv(merged_data, output_filename)
    print("Data saved to "+output_filename+" successfully.")