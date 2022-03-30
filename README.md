Projeto backend base com Node.js 14 + Express, configurado em contêineres do Docker com docker-compose.
Frontend desenvolvido com React.js

Url de deploy: http://ateliware-front.s3-website-sa-east-1.amazonaws.com/

## Estrutura de serviços do docker

- **application**: Node.js 14
- **database**: Banco de dados Mysql 5.7

## Configuração do ambiente de desenvolvimento

### 1. Clonar o repositório

```bash
git clone git@github.com:luizgzanella/ateliware-test-app.git
```

### FRONT END

Acessar a pasta `front`

```bash
cd front
```

### 2.1. Instalar pacotes

```bash
yarn install
```

### 2.2. Iniciar serviço

```bash
yarn start
```

### Acessar a aplicação em <http://localhost:3000>

### BACK END

Acessar a pasta `backend`

```bash
cd backend
```

### 2 Configurar variáveis de ambiente

Renomeie o arquivo .env `example.env` para `.env`

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
yarn migrate
```

### 7. Acessar a aplicação em <http://localhost:6868>

## Comandos úteis

- Inicar docker: `docker-compose up`
- Parar docker: `docker-compose down`
