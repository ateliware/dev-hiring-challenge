Projeto backend base com Node.js 14 + Express, configurado em contêineres do Docker com docker-compose.
Frontend desenvolvido com React.js

## Estrutura de serviços do docker

- **application**: Node.js 14
- **database**: Banco de dados Mysql 5.7

## Configuração do ambiente de desenvolvimento

### 1. Clonar o repositório

```bash
git clone git@github.com:luizgzanella/ateliware-test-app.git
```

### FRONT END

### 2. Instalar pacotes

```bash
yarn install
```

### 3. Iniciar serviço

```bash
yarn start
```

### BACK END

### 2 Configurar variáveis de ambiente

Copie o arquivo .env `cp .env.example .env`

### 3. Instalar pacotes

```bash
yarn install
```

```bash
docker-compose up -d
```

### 5. Migration (Opcional)

1. Rodar migrations do banco de dados (Opcional)

2.

```bash
npx sequelize-cli db:migrate
```

### 7. Acessar a aplicação em <http://localhost:6868>

## Comandos úteis

- Inicar docker: `docker-compose up`
- Parar docker: `docker-compose down`
