# Desafio técnico para desenvolvedores - Osvaldo

Deploy feito no Heroku. Disponível aqui https://client-175963.herokuapp.com/.

#### Funcionalidades:
- Botão para buscar e armazenar os repositórios destaques de 5 linguagens;
- Botão para excluir os repositórios armazenados;
- Lista dos repositórios encontrados;
  - Botão para abrir um dialog com os detalhes de cada repositório;

#### Detalhes:
- Front-end em [React](https://reactjs.org/)
- Back-end em [Node.js](https://nodejs.org/)
- Banco [PostgreSQL](https://www.postgresql.org/)
- Testes com [React Testing Library](https://testing-library.com/) e [Mock Service Worker](https://mswjs.io/)
- Criação de containers [Docker](https://www.docker.com/) com docker-compose

#### Outros:
##### Testes:
- cd client
- npm test

##### Docker:
- docker-compose up -d
