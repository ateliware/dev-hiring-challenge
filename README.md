# Desafio técnico para desenvolvedores

## Ferramentas


Para o desenvolvimento do BackEnd do projeto foi utilizada a linguagem [GO](https://go.dev/) com as seguintes ferramentas:
- [GIN](https://github.com/gin-gonic/gin): Framework WEB para tratamento das requisições HTTP.
- [Swaggo](github.com/swaggo/gin-swagger): Geração automática e disponibilização da documentação no padrão OpenAPI com Swagger.
- [Testify](https://github.com/stretchr/testify): Conjunto de pacotes e funções utilitárias que ajudam no desenvolvimento dos testes unitários.
- [Mockery](https://github.com/vektra/mockery): Gerador de Mocks para facilitar o desenvolvimento dos testes unitários.
- [Postman](https://www.postman.com/): Ferramenda usada para criar os testes de ponta a ponta (e2e).
- [Sentry](https://sentry.io/): Plataforma para trackeamento e monitoramento de erros.

Para o desenvolvimento do FrontEnd do projeto foi utilizado a linguagem [GO](https://go.dev/) para inializar o servidor e server de proxy para as requisições HTTP, e para a parte do ClientSide foram utilizadas técnologias nativas da WEB, sendo elas, [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) e [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), além disso foram usadas também as seguintes ferramentas:
- [GIN](https://github.com/gin-gonic/gin): Framework WEB ServerSide para tratamento das requisições HTTP.
- [Bootstrap](https://getbootstrap.com/): Biblioteca de utilitários e componentes CSS para desenvolvimento de interfaces responsivas e amigáveis.
- [jQuery](https://jquery.com/): Biblioteca de utilitários e facilitadores para JavaScript que simplifica e agiliza o desenvolvimento de aplicações para Web.
- [Sentry](https://sentry.io/): Plataforma para trackeamento e monitoramento de erros.


## Arquitetura
A arquitetura implantada no projeto usa a linguagem GO como base para o desenvolvimento do projeto, ela atua tanto como servidor BackEnd quanto FrontEnd. Para o armazenamento dos dados o banco de dados escolhido foi [PostgreSQL](https://www.postgresql.org/) e para a conteinerização da aplicação foi utilizado [Docker](https://www.docker.com/) juntamente com [DockerCompose](https://docs.docker.com/compose/) para a gerência de míltiplos containers.
 
Todo o tráfego de dados entre o FrontEnd e o BackEnd ocorre no padrão `application/json`.
 
 
## Como acessar/executar o projeto
Para executar o projeto localmente, você deve primeiro clonar o projeto usando:
```bash
$ git clone https://github.com/eduardo-mior/dev-hiring-challenge.git
```
 
 
Atenção! Antes de tentar inicializar o projeto, certifique-se de que as portas 80, 8080 e 5432 estão disponíveis na sua maquina!
 

Após ter clonado o projeto você precisará criar um arquivo `.env` na raiz do projeto, esse arquivo irá conter as mesmas chaves e valores do `.env.example`.

Após ter criado o arquivo `.env` você pode inicializar o servidor de três maneiras diferentes:
  
  
### 1) Usando docker-compose
Se você tiver o `docker-compose` instalado basta executar seguinte comando:
```bash
$ docker-compose up -d
```
  
  
### 2) Usando docker
Se você não tiver o `docker-compose` instalado porém tiver o `docker` instalado, basta executar os seguintes comandos:
```bash
$ docker build . --tag desafio_ateliware:latest
```
```bash
$ docker run -d --name postgres --volume "${PWD}/postgres:/var/lib/postgresql/data/" --volume "${PWD}/backend/sql/init.sql:/docker-entrypoint-initdb.d/init.sql" -p 5432:5432 --env POSTGRES_USER=postgres --env POSTGRES_PASSWORD=masterkey postgres:9.6-alpine 
```
```bash
$ docker run -d --name desafio-ateliware --env-file .env --link postgres -p 80:80 -p 8080:8080 desafio_ateliware
```
Atenção! Dependendo do terminal que você estiver rodando os comandos e dependendo do seu sistema operacional talvez você precise trocar o `${PWD}` por `$(pwd)` ou `%cd%`. Para mais informações [clique aqui](https://stackoverflow.com/questions/41485217/mount-current-directory-as-a-volume-in-docker-on-windows-10).
  
   
### 3) Usando o próprio GO
Se você tiver o GO e o PostgreSQL insalado na sua maquina você pode executar manualmente o SQL do arquivo `init.sql` e depois executar o arquivo `main.go`:
```bash
$ go run main.go
```