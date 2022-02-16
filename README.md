# Desafio técnico para desenvolvedores

## Sobre a solução

Para realizar o desafio utilizei:

- [Next.js](https://nextjs.org/) com [Typescript](https://www.typescriptlang.org/) para o front-end e backend
- [MySQL](https://www.mysql.com/) para armazenar o banco de dados
- [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/) para testes automáticos
- CSS puro sem frameworks

## Dependencias

é preciso ter `docker` e `docker-compose` instalados

## Desenvolver

obter as variaveis de ambiente executando:

```shell
sh envs.sh
```

executar:

```shell
docker-compose -f docker-compose.yml --env-file ./.env.development.local up
```

em outro terminal executar:

```shell
npm run dev
```

```shell
docker-compose -f docker-compose-development.yml --env-file ./.env.development.local up
```

## Executar testes

É preciso instalar as dependencias utilizando na pasta raiz do projeto utilizando:

```shell
npm install
```

obter as variaveis de ambiente executando:

```shell
sh envs.sh
```

com as dependencias instaladas (veja [Dependencias](#dependencias)), executar:

```shell
docker-compose -f docker-compose.yml --env-file ./.env.test.local up
```

e em outro terminal, executar:

```shell
npx jest
```

## Produção

executar

```shell
docker-compose -f docker-compose-production.yml --env-file ./.env.production.local up --build
```

## versão disponivel online

[http://34.125.243.67:3000](http://34.125.243.67:3000)
