## Definição de Estruturas foi feita

- Docker/Compose.
- PHP 8.1.
- AngularJS.
- Banco Dados - PostgreSQL.
- Laravel 9x.
- DDD (driven domain design) - App\Domain

## Como Instalar - Passos a Passos

- 1 - Faça um clone nesse projeto - [git clone https://github.com/gustavossouza/teste.git]
- 2 - Inicialize o docker utilizando nesse comando [docker-compose up -d --build] e aguarde...
- 3 - Agora iremos entrar dentro da imagem para usar terminal [docker exec -it testapi sh] e aguarde...
- 4 - Agora iremos navegar até a pasta do projeto [cd /usr/share/nginx] e aguarde...
- 5 - Agora iremos instalar as bibliotecas(composer) [composer install] e aguarde...
- 6 - Agora iremos criar um arquivo de variaveis [cp .env-example .env] e aguarde...
- 7 - Agora iremos criar novas tabelas para Banco Dados [php artisan migrate --seed] e aguarde...
- 8 - Agora iremos gerar uma nova key [php artisan key:generate] e aguarde...
- 9 - Agora iremos criar uma nova aba navegador favorito.. [http://localhost:8080]
- 10 - Prontinho!

## Rotas

- [http://localhost:8080/api/github] - API Cidade
- [http://localhost:8080/api/topics] - API Grupos