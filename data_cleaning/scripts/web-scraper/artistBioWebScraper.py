from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

# site to download chromeDriver
# https://sites.google.com/chromium.org/driver/

bio_catalog = pd.read_excel("bio_catalog.xlsx")

service = Service(executable_path="~path to chrome driver")
driver = webdriver.Chrome(service=service)


# loops through each URL in the artist_bios
for index, row in bio_catalog.iterrows():
    url = row["URL"]
    driver.get(url)

    try:
        # need to scrape "MAIN" after js loads within page
        driver.switch_to.frame("MAIN") 

        # scrapes the entire html file
        main_content = driver.page_source
        
        # get artist name from the page, its always under INDEX2
        name_element = driver.find_element(By.CLASS_NAME, "INDEX2")
        artist_name = name_element.text

        #  saves html files using artist name 
        with open(f"artist_bios/{artist_name}.html", "w", encoding="utf-8") as file:
            file.write(main_content)

        print(f"Page source saved to artist_bios/{artist_name}.html")

    except Exception as e:
        print(f"Error scraping artist bio at URL: {url}")
        print(e)

driver.quit()
