#Dev Hiring Ateliware

Aplicação utilizando Node e React, que conecta à API do GitHub e busca os repósitorios destaques (ordenados pelo número de "stars") de uma determinada linguagem.

Para acessar a aplicação no Heroku, [clique aqui](https://dev-hiring2.herokuapp.com/)

Para executar a aplicação:

- Criar um arquivo .env com os dados para conexão com o banco de dados Postgres, conforme exemplo no arquivo .env_example;
- Instalar dependências;
- Executar o script para criar a tabela no banco de dados:
```
  node backend/create.js
```
- Iniciar o servidor:
```
  yarn start
```
- Executar a aplicação:
```
  cd frontend
  yarn start
```

Endpoint API:
https://dev-hiring2.herokuapp.com/api/{language}

Buscar linguagem:
``` GET /api/{language} ```: Retorna os  repositórios destaque, associados à linguagem pesquisada. Quando uma nova linguagem é pesquisada, os resultados da API do GitHub são armazenados no banco de dados e a próxima busca pela mesma linguagem será retornada do banco de dados local.