# dev-hiring-challenge

Bem vindo ao projeto!\
O objetivo desse projeto é fornecer uma API que buscará os repositórios mais populares no github através da linguagem de programação escolhida pelo usuário.

O projeto é composto por uma aplicação front-end feita em VueJS, o back-end em NodeJS, e o banco de dados Postgres.

A aplicação está hospedada no Heroku, e pode ser acessada [aqui](https://github-top-5.herokuapp.com/#/repositorios)

A API está disponível também para acesso conforme abaixo:
```
GET
https://github-top-5-back.herokuapp.com/repositorios/:linguagem
```

### Back-end
Para executar o back-end localmente utilize o comando:
```
npm start
```
Para executar os testes unitários utilize os comandos:
```
npm run test:unit
npm run test:coverage 
```

### Front-end
Para executar o back-end localmente utilize o comando:
```
npm run serve
```
Para executar os testes unitários utilize o comando:
```
npm run test
npm run test:coverage
```
