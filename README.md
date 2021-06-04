## Aplicação para teste - Repos
#### Feito deploy no Heroku em: https://repo-finder-ateliware.herokuapp.com/
### Uma aplicação construida para:
- Criar repositórios baseado na Api do Github
- Listar os repositórios criado
- Visualizar detalhes do repositório escolhido, assim como do Owner do repositório.

### O que foi utilizado e informações gerais
#### Linguagem e docker
- Docker
- Ruby 2.7.1
- Rails 6
- Postgresql 12.1

#### Gems e outras bibliotecas utilizadas
- RestClient
- RSpec
- Kaminari
- Bootstrap
____
### O que eu preciso fazer para executar e testar essa aplicação
#### Podemos testar e visualizar a aplicaçaõ em dois momentos devido Docker:
#### >> Antes de tudo, deve-se entrar na pasta repos/ <<
### *Teste*
**Inicializando em modo `test` nossos containeres** <br>

`RAILS_ENV=test docker-compose up -d` <br>
`docker-compose exec app bundle exec rake db:setup db:migrate` <br>
> Trocar `db:setup` por `db:reset` caso já tenha migrado o banco antes para ter as tabelas e dados limpos.

**Após a finalização do mesmo, podemos executar os testes** <br>
`docker-compose exec app bundle exec rspec spec`
> Entre trocas de ambientes deve-se rodar o comando: `docker-compose down`
### Rodando em modo *production*
`RAILS_ENV=production docker-compose up -d` <br>
#### Caso não tenha sido criado e migrado o banco, rodar:
`docker-compose exec app bundle exec rake db:setup db:migrate`

> Trocar `db:setup` por `db:reset` caso já tenha migrado o banco antes para ter as tabelas e dados limpos.
### Pronto!
