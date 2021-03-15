# dev-hiring-challenge (Bruno Tissei)

## Descrição da Solução

O resultado consiste em uma SPA (Single-Page Application) implementada em Ruby on Rails com um front-end em React servido pelo próprio Rails. Ao atualizar os repositórios de uma linguagem, uma requisição é enviada para o back-end, onde um processo, executado pelo Sidekiq, faz uma requisição à API do Github, remove os repositórios antigos (caso existam), e armazena os novos no banco de dados (PostgreSQL). Quando esse processo termina, uma mensagem contendo os dados dos repositórios é enviada para o front-end através de um WebSocket implementado pelo Action Cable no Rails. O front-end em React, então, atualiza a página preenchendo com as novas informações.

## Instruções Para Subir o Ambiente de Desenvolvimento

É necessário criar um diretório contendo as variáveis de ambiente:  
```
.env/development/database:
  POSTGRES_USER=  
  POSTGRES_PASSWORD=  
  POSTGRES_DB=  
  REDIS_URL=redis://redis:6379
.env/development/web:
  DATABASE_HOST=database
  GITHUB_ACCESS_TOKEN=
```

Subir o ambiente de desenvolvimento utilizando o Docker Compose:
```
$ docker-compose build
$ docker-compose up -d
```

Criar, migrar, e inicializar o banco de dados:
```
$ docker-compose exec web bin/rails db:create
$ docker-compose exec web bin/rails db:migrate
$ docker-compose exec web bin/rails db:seed
```

E instalar o React:
```
$ docker-compose exec web bin/rails webpacker:install:react
```

A aplicação pode ser acessada em `localhost:3000`

## Instruções Para o Deploy

Assumindo que o app já foi criado, basta fazer o deploy dos contêineres `web` e `sidekiq`:
```
$ heroku container:push web sidekiq --recursive
$ heroku container:release web sidekiq
```
Também são necessários os add-ons `Heroku Postgres` e `Heroku Redis`, e as variáveis de ambiente de produção.

## Execução dos Testes

Para executar os testes é necessário subir o ambiente de desenvolvimento e executar o `rspec`:
```
$ docker-compose exec web bin/rails spec
```

## Resultado

https://dev-hiring-challenge-btissei.herokuapp.com/