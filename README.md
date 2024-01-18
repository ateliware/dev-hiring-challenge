Acesso do heroku: http://desafioateliwareluanzanatta.herokuapp.com

Após acessar o link, faça login no canto superior direito: 
email = luan@gmail.com / senha = 12345678 ou faça o registro

No menu favoritos no heroku já tem salvo o repositório do desafio e da aplicação(Para demonstração)
Mais explicações sobre a aplicação em si estão disponíveis ao logar 



Passo a Passo para subir o ambiente.


1 - Instalar o docker na maquina
https://www.docker.com

2 - Instalar o laravel
https://laravel.com/docs/9.x#getting-started-on-macos

- curl -s "https://laravel.build/example-app" | bash

3 - Instalar o MySQL

- brew install mysql 

3 - Instalar um gerenciador para o banco(Opcional)

- instalei o DBeaver por já ter utilizado e ter facilidade na utilização, mas pode ser qualquer um, desde que tenha suporte para MySQL.
No heroku está sendo utilizado o PostgreSQL

- brew install dbeaver-community

4 - Abrir o dbeaver e criar uma nova conexão(localhost) 

5 - Baixar os arquivos da aplicação que estão no Github 

6 - Abrir a pasta de criação da raiz laravel, "example-app" é o nome default

7 - Colocar todos os arquivos baixado dentro da pasta

8 - Iniciar o docker

9 - Levantar a aplicação 

- cd example-app
 
- ./vendor/bin/sail up

10 - Criar as tabelas do banco 

- utilizando o vscode instale a extensão do docker

- clique nela, já instalada, e acesse a opção CONTAINERS / example-pp

- Clique com o botão direito em "sail" e de depois em "Attach Shell

- No terminal aberto digite "php artisan migrate"

10 - Abra o navegador e digite http://localhost

11 - No canto direito superior clique em login e faça login: email = luan@gmail.com / senha = 12345678 ou faça o registro

FIM