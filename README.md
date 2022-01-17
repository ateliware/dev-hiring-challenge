# Ateliware project challange

Construa uma nova aplicação, utilizando o framework de sua preferência (Ruby on Rails, Elixir Phoenix, Python Django ou Flask, NodeJS Sails, Java Spring, ASP.NET ou outro), a qual deverá conectar na API do GitHub e disponibilizar as seguintes funcionalidades:

Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
Listar os repositórios encontrados;
Visualizar os detalhes de cada repositório.


# About this project

- Python 3.10
- Postgres 14
- Frontend Frameworks: Flask, Bootstrap
- Docker
- Heroku
- Unit Test

# Deploy on Heroku
- https://ateliware-project-challange.herokuapp.com/

# Installation steps
- open project in terminal and run:
    - $ docker-compose up --build
  
- open browser on: http://127.0.0.1:8001

# Requirements
- Docker

## Unit Tests
- Test new Repository (language, full_name=, html_url, stargazers_count, description)
- Test new History (email, fullname, language, url, description, date)
- Check register information found on database

## Functional Tests
- Search:
    - Test page response
    - Test make a new search
    - Test GET and POST methods

- History:
    - Test page response



