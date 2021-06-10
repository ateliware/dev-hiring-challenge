# dev-hiring-challenge

## **Ferramentas/Requisitos**

- Framework utilizado: [Laravel 8](https://laravel.com/docs/8.x)
- Banco de dados utilizado: [MySQL](https://dev.mysql.com/downloads)
- Instalar também:
    - [PHP >= 7.3.16](http://php.net/downloads.php)
    - [Composer](https://getcomposer.org/download)
    - [Docker](https://docs.docker.com) (para Ambiente com Docker)

## **Configurações**

- Clonar este projeto utilizando o comando `git clone https://github.com/jgivago/dev-hiring-challenge.git`
- Criar uma cópia do **.env.example** e renomear para **.env**, executando o comando `cp .env.example .env`
- Executar o comando `composer update` para baixar todas as dependências necessárias

## _Ambiente sem utilizar **Docker**_ ##

- Abrir o arquivo **.env** criado e setar as variáveis abaixo com os dados do banco local (Conexão com DB, Nome do DB, etc)
    
    ```php
    Exemplo

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=dev_hiring_challenge
    DB_USERNAME=root
    DB_PASSWORD=root
    ```

- Abrir o banco e criar um novo database com o nome da configuração definida na variável `DB_DATABASE` do arquivo **.env**
- Executar os comandos abaixo para limpar o cache do arquivo **.env**
    
    ```php
    php artisan config:clear
    php artisan config:cache
    php artisan optimize:clear
    ```

- Executar o comando `php artisan migrate` para rodar as migrations e criar a estrutura do DB
- Executar o comando `php artisan key:generate` para gerar uma nova *Application Key*
- Executar o comando `php artisan serve` para startar um *Server de Dev*
    
    ```php
    $ php artisan serve
    Starting Laravel development server: http://127.0.0.1:8000
    ```

- Abrir a url [http://127.0.0.1:8000](http://127.0.0.1:8000) ou [http://localhost:8000](http://localhost:8000) no browser

## _Ambiente com **Docker**_ ##

- Abrir o arquivo **.env** criado e setar as variáveis com os dados abaixo
    
    ```php
    Exemplo
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=dev_hiring_challenge
    DB_USERNAME=sail
    DB_PASSWORD=password
    ```

- Executar os comandos abaixo para limpar o cache do arquivo **.env**
    
    ```php
    php artisan config:clear
    php artisan config:cache
    php artisan optimize:clear
    ```

- Importante: Caso o MySQL local estiver rodando, parar o serviço para não conflitar com o MySQL do Docker (mesma porta)
    
    ```php
    Digite o comando WIN+R -> services.msc -> procurar serviço do mysql -> parar
    ```

- Executar o comando `./vendor/bin/sail up` para criar o ambiente com Docker
- Abrir o banco e criar um novo database com o nome da configuração definida na variável `DB_DATABASE` do arquivo **.env**
- Executar o comando `php artisan migrate` para rodar as migrations e criar a estrutura do DB
- Executar o comando `php artisan key:generate` para gerar uma nova *Application Key*
- Abrir a url [http://localhost](http://localhost) no browser

## **Como Funciona?**

- Projeto no Heroku: [https://dev-hiring-challenge-laravel.herokuapp.com](https://dev-hiring-challenge-laravel.herokuapp.com)

- Ao abrir a página, será exibida uma listagem com os 10 projetos com mais estrelas no github para as seguintes linguagens:
`PHP`, `JavaScript`, `Python`, `C#` e `Java`.

- Para realizar uma nova pesquisa na API do Github, clicar no botão `Atualizar` no topo da página.

- Sempre ficarão salvos no banco de dados apenas 10 projetos para cada linguagem, totalizando 50 (para fins de performance/heroku).

- Em cada página, serão exibidos 10 projetos. Para ir para a próxima página, utilizar a paginação no rodapé da página.

- Para ver os detalhes de um projeto, clicar no título do mesmo. Para voltar para a listagem, clicar no botão `Voltar`.

## **Como Executar os Testes?**

Em construção