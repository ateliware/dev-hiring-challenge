# Desafio técnico para desenvolvedores

## Ferramentas


Para o desenvolvimento do BackEnd do projeto foi utilizada a linguagem [GO](https://go.dev/) com as seguintes ferramentas:
- [GIN](https://github.com/gin-gonic/gin): Framework WEB para tratamento das requisições HTTP.
- [Swaggo](github.com/swaggo/gin-swagger): Geração automática e disponibilização da documentação no padrão OpenAPI com Swagger.
- [Testify](https://github.com/stretchr/testify): Conjunto de pacotes e funções utilitárias que ajudam no desenvolvimento dos testes unitários.
- ~~[Mockery](https://github.com/vektra/mockery): Gerador de Mocks para facilitar o desenvolvimento dos testes unitários.~~
- [Postman](https://www.postman.com/): Ferramenda usada para criar os testes de ponta a ponta (e2e).
- [Sentry](https://sentry.io/): Plataforma para trackeamento e monitoramento de erros.

Para o desenvolvimento do FrontEnd do projeto foi utilizado a linguagem [GO](https://go.dev/) para inializar o servidor e server de proxy para as requisições HTTP, e para a parte do ClientSide foram utilizadas técnologias nativas da WEB, sendo elas, [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) e [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), além disso foram usadas também as seguintes ferramentas:
- [GIN](https://github.com/gin-gonic/gin): Framework WEB ServerSide para tratamento das requisições HTTP.
- [Bootstrap](https://getbootstrap.com/): Biblioteca de utilitários e componentes CSS para desenvolvimento de interfaces responsivas e amigáveis.
- [jQuery](https://jquery.com/): Biblioteca de utilitários e facilitadores para JavaScript que simplifica e agiliza o desenvolvimento de aplicações para Web.
- [Sentry](https://sentry.io/): Plataforma para trackeamento e monitoramento de erros.

## Arquitetura
~~A arquitetura implantada no projeto usa a linguagem GO como base para o desenvolvimento do projeto, ela atua tanto como servidor BackEnd quanto FrontEnd. Para o armazenamento dos dados o banco de dados escolhido foi [PostgreSQL](https://www.postgresql.org/) e para a conteinerização da aplicação foi utilizado [Docker](https://www.docker.com/) juntamente com [DockerCompose](https://docs.docker.com/compose/) para a gerência de míltiplos containers~~.

Todo o tráfego de dados entre o FrontEnd e o BackEnd ocorre no padrão `application/json`.