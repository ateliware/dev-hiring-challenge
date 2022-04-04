# Frontend (Vue 3)

Aplicação Web desenvolvida em Vue 3 composition api e spectre-css, com a finalidade de demonstrar visualmente os repositorios minerados pela API do GitHub.

# Backend (Flask)

API desenvolvida utilizando o framework Flask, para a realização da mineiração dos repositorios e conexão no banco de dados MYSQL para armanezar os dados encontrados, disponibilizando-a para aplicação web.

- Atualmente na base de dados implantada na AWS RDS, possui 5 linguagens, sendo eles Java, Vue, Python, C#, JavaScript. Caso queira adicionar uma nova, é necessario apenas realizar a pesquisa pela aplicação web, que será buscado os 100 primeiros repositorios mais populares da linguagem pesquisada e salva no banco de dados.

# Local

## Frontend (Porta 8080)

``` bash
  cd frontend
  npm install
  npm run dev
  ```
- Open localhost:8080 on browser

## API (Porta 5000)

``` bash
  cd backend
  pip install -r requirements.txt
  python app.py
  ```

# Docker

Na raiz do projeto rodar o seguinte comando:
``` bash
  docker-compose up -d --build
  ```

# Heroku

https://ateliwarehiring.herokuapp.com/
