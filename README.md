# Ateliware - Dev Hiring Challenge - API

> The challenge is to create a application to comunicate with GithubAPI and implement the features bellow.
>
> - Button to search and save most featured repositories of five languages.
> - List found repositories.
> - Create repository details view.

## Technologies

- [GraphQL](https://graphql.org)
- [Jest](https://jestjs.io/pt-BR/)
- [NestJS](https://nestjs.com)
- [TypeORM](https://typeorm.io)

## Application Architecture

### API

- [Dev Hiring Challenge API](https://github.com/Leonardo-Figueiredo/dev-hiring-challenge/tree/main) (this repository)

### Client

- [Dev Hiring Challenge Client](https://github.com/Leonardo-Figueiredo/dev-hiring-challenge-frontend)

---

## Dependencies

- [Node ^16.15.1](https://nodejs.org/dist/v16.15.1/docs/api/)
- [Postgres ^14.4](https://www.postgresql.org)
- [Yarn ^1.22.19](https://yarnpkg.com)

---

## Base Setup

- Create a Postgres database.
- Run `$ cp .env.sample .env` (or just make a copy), populate .env file with valid keys.

## Local Setup (without Docker, with Docker [go to](#docker-setup-🐳))

- Follow the steps above on [Base Setup](#base-setup)
- Run `$ yarn` to install all dependencies.
- Run `$ yarn ts-typeorm -d ./src/modules/shared/data-source.ts migration:run` to create database tables.
- Run test with: `$ yarn test`.
- To start Ateliware Challenge API in development mode with `$ yarn start:dev`.
- Build production Ateliware Challenge API with `$ yarn build`.
- To start Ateliware Challenge API in production mode with `$ yarn start:prod`.

## Docker Setup 🐳

- Follow the steps above on [Base Setup](#base-setup).
- Run `$ docker-compose build development` to create development or production image.
- Run the migrations with `$ docker-compose exec development $ yarn ts-typeorm -d ./src/modules/shared/data-source.ts migration:run`.
- To execute **production** container use `$ docker-compose up production`.
- If you want to execute on background, use **-d** flag, example: `$ docker-compose up -d production`.
- To execute **development** container use `$ docker-compose up development`.
- Stop containers and dependencies, execute `$ docker-compose stop`.
  - To stop a especific container execute `$ docker-compose stop development`.
- Now run `$ docker-compose up -d development` and Ateliware Challenge API should be working fine. 🚀
- To up a container with new build, you should run `$ docker-compose up --build -d production`.

Open [http://localhost:3450](http://localhost:3450) with your browser to see the result.

_If you change the default port on .env, you should enter on <http://localhost:APP_PORT>_

### Migration Commands

```bash
# create
$ yarn ts-typeorm migration:create ./src/modules/shared/migrations/MIGRATION_NAME

# run
$ yarn ts-typeorm -d ./src/modules/shared/data-source.ts migration:run

# revert
$ yarn ts-typeorm -d ./src/modules/shared/data-source.ts migration:revert

```

## Live preview

[https://ateliware-prod-frontend.herokuapp.com](https://ateliware-prod-frontend.herokuapp.com)

[Challenge Original Repository](https://github.com/ateliware/dev-hiring-challenge)

If you have any problems, send me a e-mail [leo.nardorf22@gmail.com](mailto:leo.nardorf22@gmail.com)
