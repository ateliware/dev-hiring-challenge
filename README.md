# Desafio técnico para desenvolvedores

Construa uma nova aplicação, utilizando o framework de sua preferência (Ruby on Rails, Elixir Phoenix, Python Django ou Flask, NodeJS Sails, Java Spring, ASP.NET ou outro), a qual deverá conectar na API do GitHub e disponibilizar as seguintes funcionalidades:

- Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
- Listar os repositórios encontrados;
- Visualizar os detalhes de cada repositório.

Alguns requisitos:

- Deve ser uma aplicação totalmente nova;
- A solução deve estar em um repositório público do GitHub;
- A aplicação deve armazenar as informações encontradas;
- Utilizar PostgreSQL, MySQL ou SQL Server;
- O deploy deve ser realizado, preferencialmente, no Heroku, AWS ou no Azure;
- A aplicação precisa ter testes automatizados;
- Preferenciamente dockerizar a aplicação;
- Por favor atualizar o readme da aplicação com passo a passo com instrução para subir o ambiente.

Quando terminar, faça um Pull Request neste repo e avise-nos por email.

**IMPORTANTE:** se você não conseguir finalizar o teste, por favor nos diga o motivo e descreva quais foram as suas dificuldades. Você pode também sugerir uma outra abordagem para avaliarmos seus skills técnicos, vender seu peixe, mostrar-nos do que é capaz.

# 
# Tecnologias
- Laravel
- Blade + Bootstrap
- Mysql

# Links 
Hospedado no Heroku: https://gitrepositories-laravel-app.herokuapp.com/

#
# Ambiente de desenvolvimento Local
- Possuir Laravel e Mysql Instalados
- Clonar este repositório
- Acessar o diretório do projeto

### Executar os comandos:
```shell
cp src/.env.example src/.env
composer install
php artisan key:generate
php artisan migrate
```

### Para testes automatizados
```shell
php artisan test
```

# Ambiente de desenvolvimento Docker
- Clonar este repositório
- Acessar o diretório do projeto
### Executar os comandos:
```shell
cp src/.env.example src/.env
docker compose up -d --build
docker compose run --rm composer install
docker compose run --rm artisan key:generate
docker compose run --rm artisan migrate
```
### Para testes automatizados
```shell
docker compose run --rm artisan test
```
