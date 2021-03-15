# dev-hiring-challenge (Bruno Tissei)

## Descrição da Solução

O resultado consiste em uma SPA (Single-Page Application) implementada em Ruby on Rails com um front-end em React servido pelo próprio Rails. Ao atualizar os repositórios de uma linguagem, uma requisição é enviada para o back-end, onde um processo, executado pelo Sidekiq, faz a requisição à API do Github, remove os repositórios antigos (caso existam), e armazena os novos repositórios encontrados no banco de dados (PostgreSQL). Quando esse processo termina, uma mensagem contendo os dados dos repositórios é enviada para o front-end através de um WebSocket implementado pelo Action Cable no Rails. O front-end em React, então, atualiza a página preenchendo com as novas informações.

## Instruções Para Subir o Ambiente de Desenvolvimento

Foi utilizado o Docker Compose para o ambiente de desenvolvimento:
```
$ docker-compose build
$ docker-compose up -d
```
Agora é possível acessar a aplicação em `localhost:3000`

## Instruções Para o Deploy

Assumindo que o app já foi criado, basta fazer o deploy dos contêineres `web` e `sidekiq`:
```
$ heroku container:push web sidekiq --recursive
$ heroku container:release web sidekiq
```
Também são necessários os add-ons `Heroku Postgres` e `Heroku Redis`

## Execução dos Testes

Para executar os testes é necessário subir o ambiente de desenvolvimento e executar o `rspec`
```
$ docker-compose exec web bin/rails spec
```

## Resultado

https://dev-hiring-challenge-btissei.herokuapp.com/