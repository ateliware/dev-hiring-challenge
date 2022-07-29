#!/usr/bin/env python
# coding: utf-8

# # Projeto em python Desenvolvido com a intençao de:
# - Adicionar um botao para buscar e armazenar os repositorios destaque de 5 linguagens
# - Listar os repositorios encontrados
# - Visualizar os detalhes de cada repositorio

# ### Import de todos as extensões usadas durante o projeto, inicializador do navegador e configurando a API do github

# In[5]:


import requests
import json
#GitHub API
from github import Github

g = Github("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")

from selenium import webdriver # Cria o navegador
from selenium.webdriver.common.by import By # Localiza elementos do site
from selenium.webdriver.common.keys import Keys # Permite clicar teclas no teclado

navegador = webdriver.Chrome()


# ### Pegando o top 5 repositórios da aba trending na linguagem "Python", passando os links para o banco de dados, printando os conteudos dos repositórios e seus links para site do Github

# In[6]:


# PEGA TOP 5 PYTHON
navegador.get("https://github.com/trending/python?since=daily")

# pegar Repositorios Top 5
rep1 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[1]/h1/a').get_attribute('href')
rep2 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[2]/h1/a').get_attribute('href')
rep3 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[3]/h1/a').get_attribute('href')
rep4 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[4]/h1/a').get_attribute('href')
rep5 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[5]/h1/a').get_attribute('href')
                        
listaRepPython = [rep1,rep2,rep3,rep4,rep5]
listaRepPythonLink = [rep1,rep2,rep3,rep4,rep5]
i=0
while i<5:
    listaRepPython[i] = listaRepPython[i].replace("https://github.com/", "")
    i = i+1
    
# Top 5 Pyhton pra firebase

link = "https://ateliwaredb-default-rtdb.firebaseio.com/"

dados = {'top1': listaRepPythonLink[0]}
requisicao = requests.patch(f'{link}/Python/.json', data=json.dumps(dados))

dados = {'top2': listaRepPythonLink[1]}
requisicao = requests.patch(f'{link}/Python/.json', data=json.dumps(dados))

dados = {'top3': listaRepPythonLink[2]}
requisicao = requests.patch(f'{link}/Python/.json', data=json.dumps(dados))

dados = {'top4': listaRepPythonLink[3]}
requisicao = requests.patch(f'{link}/Python/.json', data=json.dumps(dados))

dados = {'top5': listaRepPythonLink[4]}
requisicao = requests.patch(f'{link}/Python/.json', data=json.dumps(dados))

# Printando O Conteudo De Todos Os Repositorios Top 5 Do Dia 
i=0
while i<5:
    print(f"\033[1;30;47m link do {i+1}º Repositorio: {listaRepPythonLink[i]}\n")
    print(f"\033[1;37;40m Conteudo do {i+1}º Repositorio\n")
    repo = g.get_repo(listaRepPython[i])
    contents = repo.get_contents("")
    for content_file in contents:
        display(content_file)
    i= i+1


# ### Pegando o top 5 repositórios da aba trending na linguagem "PHP", passando os links para o banco de dados, printando os conteudos dos repositórios e seus links para site do Github

# In[7]:


# PEGA TOP 5 PHP

navegador.get("https://github.com/trending/php?since=daily")

# pegar Repositorios Top 5
rep1 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[1]/h1/a').get_attribute('href')
rep2 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[2]/h1/a').get_attribute('href')
rep3 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[3]/h1/a').get_attribute('href')
rep4 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[4]/h1/a').get_attribute('href')
rep5 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[5]/h1/a').get_attribute('href')
                        
listaRepPHP = [rep1,rep2,rep3,rep4,rep5]
listaRepPHPLink = [rep1,rep2,rep3,rep4,rep5]

i=0
while i<5:
    listaRepPHP[i] = listaRepPHP[i].replace("https://github.com/", "")
    i = i+1
    
#Top 5 PHP pra firebase

link = "https://ateliwaredb-default-rtdb.firebaseio.com/"

dados = {'top1': listaRepPHPLink[0]}
requisicao = requests.patch(f'{link}/PHP/.json', data=json.dumps(dados))

dados = {'top2': listaRepPHPLink[1]}
requisicao = requests.patch(f'{link}/PHP/.json', data=json.dumps(dados))

dados = {'top3': listaRepPHPLink[2]}
requisicao = requests.patch(f'{link}/PHP/.json', data=json.dumps(dados))

dados = {'top4': listaRepPHPLink[3]}
requisicao = requests.patch(f'{link}/PHP/.json', data=json.dumps(dados))

dados = {'top5': listaRepPHPLink[4]}
requisicao = requests.patch(f'{link}/PHP/.json', data=json.dumps(dados))

# Printando O Conteudo De Todos Os Repositorios Top 5 Do Dia 
i=0
while i<5:
    print(f"\033[1;30;47m link do {i+1}º Repositorio: {listaRepPHPLink[i]}\n")
    print(f"\033[1;37;40m Conteudo do {i+1}º Repositorio\n")
    repo = g.get_repo(listaRepPHP[i])
    contents = repo.get_contents("")
    for content_file in contents:
        display(content_file)
    i= i+1


# ### Pegando o top 5 repositórios da aba trending na linguagem "Java", passando os links para o banco de dados, printando os conteudos dos repositórios e seus links para site do Github

# In[8]:


# PEGA TOP 5 JAVA

navegador.get("https://github.com/trending/java?since=daily")

# pegar Repositorios Top 5
rep1 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[1]/h1/a').get_attribute('href')
rep2 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[2]/h1/a').get_attribute('href')
rep3 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[3]/h1/a').get_attribute('href')
rep4 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[4]/h1/a').get_attribute('href')
rep5 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[5]/h1/a').get_attribute('href')
                        
listaRepJAVA = [rep1,rep2,rep3,rep4,rep5]
listaRepJAVALink = [rep1,rep2,rep3,rep4,rep5]


i=0
while i<5:
    listaRepJAVA[i] = listaRepJAVA[i].replace("https://github.com/", "")
    i = i+1
    
#Top 5 Java pra firebase

link = "https://ateliwaredb-default-rtdb.firebaseio.com/"

dados = {'top1': listaRepJAVALink[0]}
requisicao = requests.patch(f'{link}/Java/.json', data=json.dumps(dados))

dados = {'top2': listaRepJAVALink[1]}
requisicao = requests.patch(f'{link}/Java/.json', data=json.dumps(dados))

dados = {'top3': listaRepJAVALink[2]}
requisicao = requests.patch(f'{link}/Java/.json', data=json.dumps(dados))

dados = {'top4': listaRepJAVALink[3]}
requisicao = requests.patch(f'{link}/Java/.json', data=json.dumps(dados))

dados = {'top5': listaRepJAVALink[4]}
requisicao = requests.patch(f'{link}/Java/.json', data=json.dumps(dados))

# Printando O Conteudo De Todos Os Repositorios Top 5 Do Dia 
i=0
while i<5:
    print(f"\033[1;30;47m link do {i+1}º Repositorio: {listaRepJAVALink[i]}\n")
    print(f"\033[1;37;40m Conteudo do {i+1}º Repositorio\n")
    repo = g.get_repo(listaRepJAVA[i])
    contents = repo.get_contents("")
    for content_file in contents:
        display(content_file)
    i= i+1


# ### Pegando o top 5 repositórios da aba trending na linguagem "Java Script", passando os links para o banco de dados, printando os conteudos dos repositórios e seus links para site do Github

# In[9]:


# PEGA TOP 5 JAVA SCRIPT

navegador.get("https://github.com/trending/javascript?since=daily")

# pegar Repositorios Top 5
rep1 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[1]/h1/a').get_attribute('href')
rep2 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[2]/h1/a').get_attribute('href')
rep3 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[3]/h1/a').get_attribute('href')
rep4 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[4]/h1/a').get_attribute('href')
rep5 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[5]/h1/a').get_attribute('href')
                        
listaRepJS = [rep1,rep2,rep3,rep4,rep5]
listaRepJSLink = [rep1,rep2,rep3,rep4,rep5]

i=0
while i<5:
    listaRepJS[i] = listaRepJS[i].replace("https://github.com/", "")
    i = i+1
    
# Top 5 JavaScript pra firebase

link = "https://ateliwaredb-default-rtdb.firebaseio.com/"

dados = {'top1': listaRepJSLink[0]}
requisicao = requests.patch(f'{link}/JavaScript/.json', data=json.dumps(dados))

dados = {'top2': listaRepJSLink[1]}
requisicao = requests.patch(f'{link}/JavaScript/.json', data=json.dumps(dados))

dados = {'top3': listaRepJSLink[2]}
requisicao = requests.patch(f'{link}/JavaScript/.json', data=json.dumps(dados))

dados = {'top4': listaRepJSLink[3]}
requisicao = requests.patch(f'{link}/JavaScript/.json', data=json.dumps(dados))

dados = {'top5': listaRepJSLink[4]}
requisicao = requests.patch(f'{link}/JavaScript/.json', data=json.dumps(dados))

# Printando O Conteudo De Todos Os Repositorios Top 5 Do Dia 
i=0
while i<5:
    print(f"\033[1;30;47m link do {i+1}º Repositorio: {listaRepJSLink[i]}\n")
    print(f"\033[1;37;40m Conteudo do {i+1}º Repositorio\n")
    repo = g.get_repo(listaRepJS[i])
    contents = repo.get_contents("")
    for content_file in contents:
        display(content_file)
    i= i+1


# ### Pegando o top 5 repositórios da aba trending na linguagem "C++", passando os links para o banco de dados, printando os conteudos dos repositórios e seus links para site do Github

# In[10]:


# PEGA TOP 5 C++

navegador.get("https://github.com/trending/c++?since=daily")

# pegar Repositorios Top 5
rep1 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[1]/h1/a').get_attribute('href')
rep2 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[2]/h1/a').get_attribute('href')
rep3 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[3]/h1/a').get_attribute('href')
rep4 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[4]/h1/a').get_attribute('href')
rep5 = navegador.find_element(By.XPATH,
                       '//*[@id="js-pjax-container"]/div[3]/div/div[2]/article[5]/h1/a').get_attribute('href')
                        
listaRepCPP = [rep1,rep2,rep3,rep4,rep5]
listaRepCPPLink = [rep1,rep2,rep3,rep4,rep5]

i=0
while i<5:
    listaRepCPP[i] = listaRepCPP[i].replace("https://github.com/", "")
    i = i+1
    
# Top 5 CPP pra firebase

link = "https://ateliwaredb-default-rtdb.firebaseio.com/"

dados = {'top1': listaRepCPPLink[0]}
requisicao = requests.patch(f'{link}/CPP/.json', data=json.dumps(dados))

dados = {'top2': listaRepCPPLink[1]}
requisicao = requests.patch(f'{link}/CPP/.json', data=json.dumps(dados))

dados = {'top3': listaRepCPPLink[2]}
requisicao = requests.patch(f'{link}/CPP/.json', data=json.dumps(dados))

dados = {'top4': listaRepCPPLink[3]}
requisicao = requests.patch(f'{link}/CPP/.json', data=json.dumps(dados))

dados = {'top5': listaRepCPPLink[4]}
requisicao = requests.patch(f'{link}/CPP/.json', data=json.dumps(dados))

# Printando O Conteudo De Todos Os Repositorios Top 5 Do Dia 
i=0
while i<5:
    print(f"\033[1;30;47m link do {i+1}º Repositorio: {listaRepCPPLink[i]}\n")
    print(f"\033[1;37;40m Conteudo do {i+1}º Repositorio\n")
    repo = g.get_repo(listaRepCPP[i])
    contents = repo.get_contents("")
    for content_file in contents:
        display(content_file)
    i= i+1


# ### Fechando o navegador e printando o nome dos usuarios e o nome dos repositórios

# In[11]:


navegador.close()
display("Nome/Rep do top 5 Python",listaRepPython ,"Nome/Rep do top 5 PHP",listaRepPHP,"Nome/Rep do top 5 Java",
        listaRepJAVA,"Nome/Rep do top 5 JavaScript", listaRepJS,"Nome/Rep do top 5 C++", listaRepCPP)

# Nome do Usuario e Nome do Repositório, respectivamente


# ### Instalaçoes necessárias durante o processo de criaçao do APP

# In[12]:


#!pip install selenium
#!pip install pyrebase
#!pip install requests
#!pip install pyinstaller
#!pip install pyGithub

