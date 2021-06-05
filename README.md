# ateliware_challenge

## Desafio técnico para desenvolvedores em repositório público[5]!

## Disponível em: https://ateliware-mff-dev.herokuapp.com/

### Esse desafio proporcionou a oportunidade de trabalhar com a API do GitHub em Python! Utilizando a Framework Django e Bootstrap (datatables):

1. A aplicação é capaz de procurar repositórios escolhidos pelo usuário em uma entrada de texto do tipo 'input tags' que contém até 51 linguagens (O desafio propunha apenas 5)! E por meio de um botão[1] a lógica back-end atua para cadastrar novos repositórios ou atulizar os já cadastrados [6] em um banco instanciado em postGreSQL [7] e retorna um novo por linguagem.

2. O sort é feito com base no maior número de estrelas por repositório, o front-end em HTML e JS recebe por meio de jinjas os dados do back-end e os estrutura em dois datatables, o primeiro com os repositórios encontrados pela busca e o segundo com todos os repositórios já pesquisados listados[2], contendo diversos detalhes específicos[3]. Sob o nome de cada repositório há um hiperlink direcionando à sua respectiva página no GitHub e os datatables são atualizados na tela sem que seja necessário redirecionar para novas páginas, utilizando requisições assíncronas de JS (AJAX).

3. Afim de garantir que tudo isso funcione sem que o desenvolvedor tenha que testar os pontos chave, em tests.py existem testes automatizados[9] que infelizmente não funcionaram no Heroku!

4. Instruções de Deploy [11] na plataforma HEROKU [8]:

### Instruções para deploy da aplicação em Heroku em windows 10:

#### A documentação oficial pode ser lida em: https://devcenter.heroku.com/articles/getting-started-with-python

1. Instalar Heroku na máquina local;
2. Após cadastrar/configurar usuário e senha na plataforma Heroku,
3. Iniciar Heroku no CMD local: ```heroku login```;
4. A tela do webbrowser padrão do sistema irá abrir na plataforma Heroku com um botão de confirmação ou login caso você não esteja logado(a);
5. Criar projeto pela plataforma e renomear (nesse caso o nome é: ateliware-mff-dev)
6. Abrir algum diretório para configurar virtualenv: ```cd diretorio/env```
7. Criar virtualenv: ```virtualenv venv```
8. Ativar: ```venv\scripts\activate```
9. Instalar todas as bibliotecas necessárias ao projeto:
	```pip install django selenium PyGithub psycopg2```
10. Criar um arquivo requirements.txt: ```pip freeze > requirements.txt```
11. Abrir o diretório com o projeto em django: ```cd ../Ateliware_djangoProject```
12. Iniciar o git: ```git init (gera pasta .git)```
13. Adicionar todos os arquivos: ```git add -A```
14. Realizar commit das alterações: ```git commit -m 'comentário'```
15. Mapear o ambiente git-heroku com o nome do projeto criado: ```heroku git:remote -a ateliware-mff-dev```
16. Realizar push do commit[13] no repositório do projeto no git da heroku: ```git push heroku master```
17. Verificar o status da aplicação pelo comando: ```heroku logs --tail```
18. Visualizar as configurações do PostgreSQL na plataforma pelo comando: ```heroku open```
19. Inserir item a item nas variáveis de ambiente heroku: Settings -> Config Vars
20. Inserir variáveis de ambiente para controle da aplicação: ENVIRON, GITHUB_TOKEN e SECRET_KEY
21. Criar arquivo Procfile:
	```
    release: python manage.py migrate ateliware_git_app
    web: gunicorn django_project.wsgi
    ```
22. Informar a versão de Python utilizada pelo arquivo runtime.txt: 
	```python-3.9.5```
23. Alterar a lista de hosts permitidos em settings.py: ```ALLOWED-HOSTS = ['ateliware-mff-dev.herokuapp.com'] ```
24. Realizar commit das informações alteradas: 
	```
    git add .
	   git commit -m 'Alterações para deploy da aplicação'
    git push heroku master
    ```
	
25. Executar a aplicação na web dentro da url permitida em [23] pelo comando: ```heroku ps:scale web=1```
26. Executar: ```Heroku open``` para abrir a aplicação no webbrowser.

## Requisitos propostos pela Ateliware:

1. Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
2. Listar os repositórios encontrados;
3. Visualizar os detalhes de cada repositório;
4. Deve ser uma aplicação totalmente nova;
5. A solução deve estar em um repositório público do GitHub;
6. A aplicação deve armazenar as informações encontradas;
7. Utilizar PostgreSQL, MySQL ou SQL Server;
8. O deploy deve ser realizado, preferencialmente, no Heroku, AWS ou no Azure;
9. A aplicação precisa ter testes automatizados;
10. Preferenciamente dockerizar a aplicação e
11. Por favor atualizar o readme da aplicação com passo a passo com instrução para subir o ambiente [11].
