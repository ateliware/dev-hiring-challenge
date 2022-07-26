from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import random
import time as time

browser = webdriver.Chrome("chromedriver.exe")
browser.get("http://localhost:8501/")
browser.maximize_window()
time.sleep(2)


def test_search():
    language = ['java', 'python', 'javascript', 'c#', 'go', 'xml', 'c', 'c++']
    repositorio = ['odoo', 'jogo da velha', 'jogo', 'facebook', 'orkut', 'youtube', 'api', 'brasil']
    for i in range(0, 50):
        repositorio_browser = browser.find_element("xpath",
                             '//*[@id="root"]/div[1]/div[1]/div/div/div/section[2]/div/div[1]/div/div[3]/div/div[1]/div/input')
        language_browser = browser.find_element("xpath",
                             '//*[@id="root"]/div[1]/div[1]/div/div/div/section[2]/div/div[1]/div/div[4]/div/div[1]/div/input')
        button_browser = browser.find_element("xpath",
                             '//*[@id="root"]/div[1]/div[1]/div/div/div/section[2]/div/div[1]/div/div[5]/div/button')
        repositorio_browser.send_keys(random.choice(repositorio))
        language_browser.send_keys(random.choice(language))
        button_browser.click()
        time.sleep(2)
        repositorio_browser.send_keys(Keys.CONTROL + "a")
        repositorio_browser.send_keys(Keys.DELETE)
        language_browser.send_keys(Keys.CONTROL + "a")
        language_browser.send_keys(Keys.DELETE)


def test_historic_where():
    browser.refresh()
    time.sleep(2)
    language = ['java', 'python', 'javascript', 'c#', 'go', 'xml', 'c', 'c++']
    for i in range(0, 50):
        historic_browser = browser.find_element("xpath", '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[3]/div/div[1]/div/input')
        button_historic_browser = browser.find_element("xpath", '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[5]/div/button')
        historic_browser.send_keys(random.choice(language))
        button_historic_browser.click()
        historic_browser.send_keys(Keys.CONTROL + "a")
        historic_browser.send_keys(Keys.DELETE)


def test_historic():
    for i in range(0, 50):
        button_historic_browser = browser.find_element("xpath", '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[5]/div/button')
        repositorio_browser = browser.find_element("xpath",
                                                   '//*[@id="root"]/div[1]/div[1]/div/div/div/section[2]/div/div[1]/div/div[3]/div/div[1]/div/input')
        button_historic_browser.click()
        repositorio_browser.click()


def test_clear_hist_where():
    language = ['java', 'python', 'javascript', 'c#', 'go', 'xml', 'c', 'c++']
    for i in range(0, 50):
        historic_browser = browser.find_element("xpath",
                                                '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[3]/div/div[1]/div/input')
        button_clear = browser.find_element("xpath", '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[4]/div/button')
        historic_browser.send_keys(random.choice(language))
        button_clear.click()
        historic_browser.send_keys(Keys.CONTROL + "a")
        historic_browser.send_keys(Keys.DELETE)


def test_clear_historic():
    for i in range(0, 50):
        button_clear_browser = browser.find_element("xpath", '//*[@id="root"]/div[1]/div[1]/div/div/div/section[1]/div[1]/div[2]/div/div[1]/div/div[4]/div/button')
        repositorio_browser = browser.find_element("xpath",
                                                   '//*[@id="root"]/div[1]/div[1]/div/div/div/section[2]/div/div[1]/div/div[3]/div/div[1]/div/input')
        button_clear_browser.click()
        repositorio_browser.click()


test_search()
test_historic_where()
test_historic()
test_clear_hist_where()
test_clear_historic()

