# dev-hiring-challenge Tiago Junior Pereira

## Solução

Aplicação desenvolvida em Ruby on Rails com front-end em VueJs ultilizando o webpacker do Rails.

## Ambiente de Desenvolvimento

Criar os seguintes arquivos na pasta raiz do projeto contendo as variáveis de ambiente:  
```
rails.env
  GITHUB_TOKEN=
db.env
  DB_DATABASE=
  DB_USERNAME=
  DB_PASSWORD=
  DB_HOST=database
  DB_PORT=
  POSTGRES_PASSWORD=
```

Utilizar o Docker Compose para subir a aplicação:
```
$ docker-compose build
$ docker-compose up -d
```

Inicializar o banco de dados:
```
$ docker-compose exec web bin/rails db:create db:migrate db:seed
```

Acessar `localhost:3000`

## Testes

Para executar os testes é rodar o comando abaixo:
```
$ docker-compose exec web bin/rails spec
```

## Aplicação disponível

https://dev-hiring-challenge-tiago-jp.herokuapp.com/