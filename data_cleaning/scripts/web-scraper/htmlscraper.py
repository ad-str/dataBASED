from bs4 import BeautifulSoup, Comment
import os
import pandas as pd
import time

def extract_paragraphs(html_file):

    soup = BeautifulSoup(html_file, 'html.parser')

    # bios are between start and end comments
    start_comment = soup.find(text=lambda text: isinstance(text, Comment) and "Start" in text)
    end_comment = soup.find(text=lambda text: isinstance(text, Comment) and "End" in text)

    
    paragraphs = []

    # finds all paragraphs between start and end comments
    if start_comment and end_comment:
        for element in start_comment.find_all_next():
            if element == end_comment:
                break
            if element.name == 'p':
                paragraph_text = element.get_text()
                #print(paragraph_text) debug fun :O
                paragraphs.append(paragraph_text.strip())

    return ' '.join(paragraphs)

def extract_url(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    url = soup.find('a', href=True, string="Friendly format for printing and bookmarking")['href']
    return url

if __name__ == "__main__":
    start = time.time()

    folder_path = '/artist_bios'
    output_excel_path = '/artist_bios_scraped.xlsx'
    

    #sorts alphabetically
    count=0
    data = {'Artist Name': [], 'Paragraphs': [], 'URL': []}
    for filename in os.listdir(folder_path):

        # get name of artist
        artist_name = filename.split('.')[0]
        data['Artist Name'].append(artist_name)

        # writes files to output excel file
        if filename.endswith('.html'):
            with open(os.path.join(folder_path, filename), "r", encoding="utf-8") as f:
                html_content = f.read()
                paragraphs = extract_paragraphs(html_content)
                url = extract_url(html_content)
                data['Paragraphs'].append(paragraphs)
                data['URL'].append(url)
                
                count+=1
                print(count) 
                print(url)


    df = pd.DataFrame(data)
    df.to_excel(output_excel_path, index=False)
    print("Data saved to "+output_excel_path+" successfully.")
    end = time.time()
    runtime = end-start
    print("Total Runtime: ",runtime," seconds")

                
