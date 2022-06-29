# ateliware-dev-hiring-challenge

## Tecnologias usadas

A aplicação foi desenvolvida 100% com TypeScript, tanto no frontend quanto no backend. Abaixo, segue as tecnologias escolhidas da linguagem que tornou possível o desenvolvimento do desafio.

### Frontend

- Para a implementação do frontend, foi escolhido o [React – A JavaScript library for building user interfaces.](https://reactjs.org/)

- Como alternativa para [Create React App](https://create-react-app.dev/), foi escolhido o [Vite.](https://vitejs.dev/)

- Para a parte de UI da aplicação, foi utilizado o pacote [Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.)](https://chakra-ui.com/)

### Backend

- Para a implementação da API, foi escolhido o framework [NestJS - A progressive Node.js framework.](https://nestjs.com/)

- Como ORM, foi escolhido o [Prisma.](https://www.prisma.io/)

- Como banco de dados foi escolhido o [MySQL.](https://www.mysql.com/)

## Heroku

O deploy da aplicação completa (frontend, backend e banco de dados) foi feita no heroku. Segue o link: [dev-hiring-challenge](https://google.com)

## Rodando a aplicação localmente

Como o frontend e o backend foram feitos em [NodeJS (Run JavaScript Everywhere)](https://nodejs.dev/), o procedimento para inicialização é bem parecido.

1. O primeiro passo é ter o node instalado na máquina. Link para download no site oficial: [Download | Node.js (nodejs.org)](https://nodejs.org/pt-br/download/)

2. Após clonar o repositório e entrar no diretório raíz do projeto, é necessário configurar as variáveis de ambiente para o correto funcionamento da aplicação. Para isso, execute o seguinte comando:

```bash
npm run create-api-dotenv
```

3. Agora, para instalar todas as dependências necessárias da api e do client, é preciso executar o seguinte comando:

```bash
npm run install-dependencies
```

4. Para criar um banco de dados chamado ateliware-dev-hiring-challenge no seu MySQL local, executar:

```bash
npm run create-db
```

5. Para executar os testes unitários:

```bash
npm run test-api
```

6. Para inicializar a aplicação:

```bash
npm run start:dev
```

7. Api estará sendo executada em http://localhost:3000 e client em http://localhost:3001
