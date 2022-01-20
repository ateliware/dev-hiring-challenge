# DEV HIRING CHALLENGE - ATELIWARE

Uma aplicação desenvolvida para consumo da api do github, listando os principais repositórios das seguintes linguagens: Python, Javascript, Rust, Elixir e Ruby. 

## Instruções

### Dependências
- docker

### Arquivos de configuração
    Crie um arquivo .env baseado em .env.example com a url de acesso ao banco de dados, chave secreta, a url da api do github e se será debugado o código.

### Container do banco de dados
    docker network create postgres
    docker run -d --name postgres --network=postgres -e "POSTGRES_PASSWORD=teste" -p 5432:5432 -v data:/var/lib/postgresql/data postgres

### Criando banco de dados
    docker exec -t postgres psql -U postgres -c "CREATE DATABASE dev_hiring_challenge"

### Buildando container da aplicação
    docker build -t ateliware/dev-hiring-challenge .

### Executando container
    docker run -p 8000:8000 --network postgres --name dev-hiring-challenge ateliware/dev-hiring-challenge

### Aplicando migrations
    docker exec -t dev-hiring-challenge python manage.py migrate

### Testando aplicação
    docker exec -t dev-hiring-challenge python manage.py test

### URL do ambiente de produção
https://blooming-shelf-11188.herokuapp.com/