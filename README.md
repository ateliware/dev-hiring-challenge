

# Sobre a aplicação

Essa aplicação foi desenvolvida com Rails v.6.1.3 e Vue.js, com intuito de dividir o processamento das requisições entre back e o front.
O consumo do [endpoint](https://api.github.com/search/repositories) e a comunicação com a API dessa aplicação é feito com recursos do [axios](https://www.npmjs.com/package/vue-axios).

O banco de dados escolhido foi PostgreSQL.

## Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina o Docker,
 caso não tenha o Docker instalado  faça o download do [instalador Docker](https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe), ou se preferir acesse https://docs.docker.com/docker-for-windows/install/ e siga as instuções.

Você também vai precisar do Git para o passo 1,
caso não tenha ou não queira utilizar o git pode copiar o projeto por download [aqui](https://github.com/Mikaele/desafio-ruby-backend/archive/master.zip), nesse caso descompacte o arquivo zip em uma pasta de sua e preferencia caminhe até a pasta pelo terminal/cmd e continue do passo 2.

## Executando

*Copiando/clonando a aplicação*

##### 1. Faça o download da aplicação clonando este repositório
Abra o terminal/cmd e execute o camndo abaixo
```sh
git clone https://github.com/Mikaele/dev-hiring-challenge.git
```

##### 2. Entre no diretório/pasta do projeto pelo terminal/cmd
```sh
cd dev-hiring-challenge
```
*Executando a aplicação*

Todos o comandos abaixo devem ser executados no terminal/cmd também 

##### 3. Compile as imagens necessárias para configurar o ambiente necessário para testar a aplicação
```sh
docker-compose up -d
```

##### 4. Verificando o status dos containers
```sh
docker-compose ps
``` 
##### 5. Criando o banco de dados e as tabelas

cria o banco
```sh
docker-compose exec web rake db:create  
```    
cria a tabela
```sh
docker-compose exec web rake db:migrate
``` 

##### 6. Se até aqui deu tudo certo você pode visualizar em [http://localhost:3000/](http://localhost:3000/) 