# Github Repositories

Permite procurar os top 10 repositórios das linguagens disponíveis.

# Instalação
Para instalar é necessário:
- `ruby 2.7.2`
- `PostgreSQL`

## Rails
- `$ gem install rails`

## Instalando as dependências do projeto
```bash
$ git clone git@github.com:losoliveirasilva/dev-hiring-challenge.git
$ cd dev-hiring-challenge
$ bundle install
```
## Inicializando o banco de dados
- `rails db:create db:migrate`
- `rails db:seed` _opcional_

# Rodando o projeto
- `rails s`
- `yarn start`

# Demo
Acessar: https://challenge-github-search.herokuapp.com/

A demo já possui um usuário, mas você pode criar um novo se desejar:
- email: example@example.com
- senha: 123123

# Screenshots

# Modelo entidade relacionamento
![Entity Relationship Diagram](doc/screenshots/erd.png)

## Without user - blank list
![No user - blank list](doc/screenshots/no-user-empty.png)

## Without user - C list
![No user - C list](doc/screenshots/no-user-empty.png)

## With user - C list
![No user - C list](doc/screenshots/user-c.png)

## With user - Favorites
![No user - C list](doc/screenshots/user-starred.png)
