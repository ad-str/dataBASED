import os
import csv
import json
import time

def merge_json_files(folder_path):
    merged_data = []
    count = 0
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

    start = time.time()
    # specify paths and filenames
    json_folder_path = '/Users/daunel/Desktop/CIT /550 Project/artic-api-data/json/places'
    output_filename = '/Users/daunel/Desktop/CIT /550 Project/artic-api-data/places.csv'


    merged_data = merge_json_files(json_folder_path)


    save_to_csv(merged_data, output_filename)
    print("Data saved to "+output_filename+" successfully.")
    end = time.time()
    runtime = end-start
    print("Total Runtime: ",runtime," seconds")
