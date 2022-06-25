# Ateliware - Dev Hiring Challenge

> The challenge is to create a application to comunicate with GithubAPI and implement the features bellow.
>
> - Button to search and save most featured repositories of five languages.
> - List found repositories.
> - Create repository details view.

## Technologies

- [ChakraUI](https://chakra-ui.com)
- [GraphQL](https://graphql.org)
- [NestJS](https://nestjs.com)
- [Next.js](https://nextjs.org)
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

---

## Base Setup

- Create a Postgres database.
- Run `$ cp .env.sample .env` (or just make a copy), populate .env file with valid keys.

## Local Setup

- Follow the steps above on [Base Setup](#base-setup)
- Run `$ yarn` to install all dependencies.
- Run `$ yarn yarn ts-typeorm -d ./src/modules/shared/data-source.ts migration:run` to populate the database.
- Run test with: `$ yarn test`.
- To start Ateliware Challenge API in development mode with `$ yarn start:dev`.
- Build production Ateliware Challenge API with `$ yarn build`.
- To start Ateliware Challenge API in production mode with `$ yarn start:prod`.

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
