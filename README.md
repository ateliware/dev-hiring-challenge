# GitHub Search

Aplicação que busca os repositórios mais relevantes das 5 linguagens pré-selecionadas no início do projeto (JavaScript, Python, Ruby, Elixir, TypeScript)

## Antes de executar o projeto

### Pré-requisito

É preciso que tenha [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/gettingstarted/) instalados na sua máquina.

### .env

Com o repositório clonado na sua máquina, entre no diretório do projeto e crie um arquivo `.env`. Sem ele, não será possível executar o projeto. Utilize o arquivo `.env.example` localizado na raiz do projeto como referência para criar o seu arquivo `.env`.

Certifique-se de que o valor de `DATABASE_PASSWORD` localizado no arquivo `.env` possui o mesmo valor de `POSTGRES_PASSWORD` localizando no `docker-compose.yml`. O valor do `GITHUB_TOKEN` deve ser gerado no próprio GitHub, pode seguir esse [tutorial](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) caso ainda não possua um token a ser utilizado

## Executando o projeto

Se o arquivo `.env` foi devidamente criado, agora você já tem o que é preciso para rodar o projeto.

### Build da aplicação

Primeiro, é necessário que você faça o build da aplicação. Para isso, execute o comando abaixo

```
docker-compose build
```

### Criação do banco de dados

Após finalizado o build da aplicação, é necessário criar o banco de dados, executar as migrações e fazer o seed. Para isso, execute o comando abaixo.

```
docker-compose run web rails db:create db:migrate db:seed
```

### TailwindCSS

Essa aplicação utiliza o TailwindCSS para estilização e é necessário que execute esses comandos em sequência para que a aplicação seja devidamente estilizada.

```
docker-compose run web bin/rails tailwindcss:install
docker-compose run web rake tailwindcss:build
```

### Rodar o projeto

Agora, execute o comando abaixo e a aplicação estará disponível na porta 3000, através desse [link](localhost:3000) ou desse [link](0.0.0.0:3000).

```
docker-compose up
```

## Testes

Os testes podem ser executados com o comando abaixo.

```
docker-compose run web bundle exec rspec
```
