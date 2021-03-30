# GITHUB FETCHER - PROJETO DE AUGUSTO J. Z. ARAUJO

## O Projeto

Uma aplicação que pesquisa o repositório mais relevante (quantidade de repositórios relevantes pode ser alterado com facilidade para mais de um em outras versões da aplicação, caso haja necessidade) para de cada uma das 5 linguagens pré definidas. Mais linguagens podem ser adicionadas à pesquisa. Aplicação feita em Ruby on Rails. Banco de dados utilizado: Postgresql. Front-end feito somente com SASS CSS.

## Instruções para executar e alterar a aplicação localmente

#### .ENV
Há a necessidade de criar um arquivo .env com as seguintes variáveis de ambiente:
```
GITHUB_KEY=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
SECRET_KEY_BASE=
```
GITHUB_KEY é o token de autenticação gerado no próprio github (GITHUB -> Settings -> Developer Settings -> Personal access tokens). É utilizado no Octokit, devido ao fato de que sem autenticação na API do Github só são permitidas 10 requisições por minuto.

#### Docker
##### Subir o ambiente com Docker Compose

Utilizar os seguintes comandos:
```
docker-compose up -d db
docker-compose build
```

##### Criar, migrar e seedar o banco de dados
```
docker-compose run rails db:create db:migrate db:seed
```

##### Acesso
```
localhost:3000
```

## Ambiente de produção

Foi utilizado Heroku. Pode-se fazer push para production com:

```
git push heroku master
```

## Testes

Os testes podem ser executados com o seguinte comando:
```
docker-compose exec web bin/rails spec
```

## Endereço da aplicação

[https://github-api-search.herokuapp.com/](https://github-api-search.herokuapp.com/)