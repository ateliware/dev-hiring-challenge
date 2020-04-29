# Desafio técnico para desenvolvedores

## Objetivo

Construa uma nova aplicação, utilizando o framework de sua preferência (Rails, ASP.NET, Phoenix, etc), a qual deverá conectar na API do GitHub e disponibilizar as seguintes funcionalidades:

- Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
- Listar os repositórios encontrados;
- Visualizar os detalhes de cada repositório.

Alguns requisitos:

- Deve ser uma aplicação totalmente nova;
- A solução deve estar em um repositório público do GitHub;
- A aplicação deve armazenar as informações encontradas;
- Utilizar Postgres, MySQL ou SQL Server;
- O deploy deve ser realizado, preferencialmente, no Heroku ou no Azure;
- A aplicação precisa ter testes automatizados.

Quando terminar, faça um Pull Request neste repo e avise-nos por email.

**IMPORTANTE:** se você não conseguir finalizar o teste, por favor nos diga o motivo e descreva quais foram as suas dificuldades. Claro que você também pode sugerir uma outra abordagem para avaliarmos seus skills técnicos, mas é com você para vender seu peixe, mostrar-nos do que é capaz.

## Solução/Implementação

**TABLEA DE CONTEÚDO** 
* [Em execução na nuvem](#em_execucao)
* [Camadas](#camadas)
* [Banco de Dados](#db)
* [Configuração do CORS](#cors) 
* [Instalação e execução](#instalexec)
* [Endpoints](#endpoints)


<a name="em_execucao"></a>

### Em execução na nuvem

O projeto foi implantando na AWS utilizando o Elastic BeanStalk e o Amazon RDS (PostgreSQL).

Você pode acessá-lo através do seguinte link:
http://d1xfhcp02o1bf7.cloudfront.net/index.html

<a name="camadas"></a>

### Camadas

O projeto é composto das seguintes camadas:

|Camada   | Descrição  | Linguagem | Framework | Build Tool |
|--|--|--|--|--|
| github-api | Responsável por receber as requisições da camada de front-end e intermediar a comunicação com o banco de dados. | Java |  Spring Boot 2.x| Maven |
| github-front | Responsável por proporcionar a interação direta com o usuário e conectar com a API do GitHub. | JavaScript |  React | NPM |

<a name="db"></a>

### Banco de dados

Este projeto utiliza **PostgreSQL** como SGBD. Antes de iniciar, é necessário que você crie o banco de dados primeiro no seu servidor.

`CREATE DATABASE repos`

Configure a conexão de banco de dados através de variáveis de ambientes no seu sistema operacional. Os nomes das variáveis devem ser os seguintes:

| Nome Variável | Valor
|--|--|
|POSTGRE_HOST|Endereço do seu servidor de banco de dados
|POSTGRE_PORT|Porta para conectar ao seu banco de dados
|POSTGRE_USERNAME|Nome de usuário do seu banco de dados
|POSTGRE_PASSWORD|Senha do seu banco de dados

#### Linux

Se você for usuário de qualquer distro Linux, altere o arquivo `.profile` dentro da sua pasta de usuario, adicione ao final os seguintes valores:

```
export POSTGRE_HOST=<endereco do seu host de banco de dados>
export POSTGRE_PORT=<porta do seu host de banco de dados>
export POSTGRE_USERNAME=<insira seu username>
export POSTGRE_PASSWORD=<insira sua senha>
```

Salve o arquivo e seguida execute o comando: `source ~/.profile` para carregar os novos valores, ou se preferir, reinicie o computador.

<a name="cors"></a>

### Configuração do CORS

Para liberar o front-end de acessar os endpoints da camada `github-api`, adicione mais uma variável de ambiente ao seu sistema operacional:

| Nome Variável | Valor
|--|--|
|FRONTEND_HOST|URL do seu front-end (ex.: https://localhost:3000)

#### Linux

Se você for usuário de qualquer distro Linux, altere o arquivo `.profile` dentro da sua pasta de usuario, adicione ao final os seguintes valores:

`export FRONTEND_HOST=<endereço do seu front-end>`

Salve o arquivo e seguida execute o comando: `source ~/.profile` para carregar os novos valores, ou se preferir, reinicie o computador.

<a name="instalexec"></a>

### Instalação e execução

Depois de configuradas as variáveis de ambientes e de ter criado o banco de dados, podemos então prosseguir para a instalação de cada camada.

#### Pré-requisitos

É importante que você tenha instalado em sua máquina o [maven](https://maven.apache.org/install.html) e o [npm](https://www.npmjs.com/get-npm).

##### github-api

Esta é uma aplicação desenvolvida em Java com Spring Boot. Para baixar as dependências, dentro da pasta **github-api** execute o seguinte comando através do terminal: `mvn clean install`.

Em seguida, execute o projeto com o seguinte comando no terminal: `java -jar target/*.jar`

##### github-front

Esta é uma aplicação desenvolvida em JavaScript com React. Para baixar as dependências, dentro da pasta **github-front** execute o seguinte comando através do terminal: `npm install` ou se tiver o [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable), use: `yarn install`

Em seguida, execute o projeto com o seguinte comando no terminal: `npm start` ou `yarn start`

<a name="endpoints"></a>

### Endpoints

Não que seja necessário você interagir diretamente com os endpoints, mas para essa aplicação, foram desenvolvidos apenas esses:

| Método | Caminho | Descrição
|--|--| -- |
|GET|/api/repos/ | Retorna um *array* JSON com os repositórios.
|POST|/api/repos/ | Envia um JSON para armazenar dados de um repositório.
|DELETE|/api/repos/ | Remove todos os repositórios do banco de dados
