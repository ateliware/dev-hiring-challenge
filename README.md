# Renan Nakashima - Dev Hiring Challenge

Implementa o teste técnico para o processo seletivo da Ateliware.

## Implementação

A arquitetura implementada utiliza React no front-end (Client) e Express.js no back-end (API).

## Funcionamento

O funcionamento é bastante simples.

1. A aplicação cliente solicita ao backend as informações do repositório
2. O back-end realiza uma chamada externa à API do github, salvando as informações dos repositórios em um banco de dados Postgres 
3. O back-end devolve as informações para o cliente, que irá renderizar os resultados.

## Deploy no Heroku

O deploy do cliente e da api foram feitos utilizando Heroku.

* <client-dhc.herokuapp.com>
* <api-dhc.herokuapp.com/repos>
