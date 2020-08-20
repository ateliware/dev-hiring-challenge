# Github Repo Searcher v1.0
Github Repo Searcher é uma aplicação que recebe como parâmetro linguagens ou repositórios que o usuário desejar procurar na base do Github.
Os resultados são mostrados ao usuário e ele pode se logar e ter a opção de salvar como Favorito  algum repositório de sua escolha.


## Environment
Ruby 2.6.2

Rails 6.0.3

Base de Dados PostgreSQL

Deployed on Heroku®

### Instalando as Gems:
```
bundle install
```
### Criando a Base de Dados
```
rails db:create
```
```
rails db:migrate
```
## Rodando o Projeto
```
rails server
```

## Testes
Utilizei Minitest e ActiveSupport como base para TDD desta aplicação.


### Criando Base de Testes
```
rails db:create RAILS_ENV=test
```
```
rails db:migrate RAILS_ENV=test
```
### Rodando Testes
```
rake test test/models/repository_test.rb
```

## Deploy
Deploy feito na plataforma do Heroku

https://gitreposearcher.herokuapp.com/


## Documentação
| URL | Rota | Descrição |
| ----------- | ---- | --------- |
| /?query=rails&commit=Search | repositories#index | URL de pesquisa que recebe como parâmetro a pesquisa pelo repositório |
| /user/sign_in | users#sign_in | Página p/ usuários se logarem no aplicativo |
| /repositories | repositories#index | Contém todos os favoritos salvos pelo usuário |
| /repositories/{:id} | repositories#show | Mostra mais detalhes de cada repositório salvo pelo usuário, como suas métricas e um link de redirecionamento |
