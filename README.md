# ExHub

Aplicação criada para buscar e lista os principais repositorios de 5 linguagens no GitHub. 

Projeto criado em Elixir, utilizando Phoenix LiveView como Front-End e HTTPoison para fazer requests HTTP.

Criado por: Rafael Antunes (dev@rafaelantun.es) - 2021

## Deployment

### Requisitos

- git
- docker
- docker-compose

### Passos

- `git clone https://github.com/devrafaelantunes/exhub.git`
- `cd exhub`
- `cd assets && npm install && cd ../`
- `docker-compose up`

O `docker-compose` irá instanciar os containers com o banco de dados e com a aplicação Phoenix. A aplicação estará disponível em `http://localhost`, na porta 80.
