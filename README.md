
# Ateliware Dev Challenge 

## Apresentação

Implementação para atender aos requisitos do desafio técnico proposto. 
Através de um botão, a aplicação localiza no GitHub repositórios de cinco liguagens de programação, 
ordenando os itens por maior quantidade de estrelas. Para personalizar a pesquisa, é possível informar
termos de interesse, como por exemplo: "Machine learning". A aplicação armazena todas as consultas 
realizadas, apresentando um menu, abaixo do botão, permitindo recarregar os resultados obtidos. 
Em cada item é possível consultar mais detalhes do repositório. 

## Stack utilizada

- Aplicação: Python 3.8+
- Framework: Flask 2 | Pytest | PyGithub
- Banco de dados: MySQL 
- Front: MVC
- Deploy: Microsoft Azure AND Digital Ocean

## Acessa a aplicação

- DIGITAL OCEAN: <http://142.93.247.248:5000/>
- AZURE: <http://melsardalri.southcentralus.cloudapp.azure.com:5000>


## Instruções para montar o ambiente

### Pré requisitos

Será necessário ter acesso ao Docker e Docker Compose em seu ambiente. Seguem links com instruções 
de instalação:

- Install Docker Egine: <https://docs.docker.com/engine/install/>
- Install Docker Compose: <https://docs.docker.com/compose/install/>


### Criar diretório

Crie um diretório em seu ambiente em local e com nome de sua preferência. E acesse este diretório.


### Acesso ao código

Carregar o código da aplicação no diretório criado.

Clonar repositório:
```bash
git clone https://github.com/MelsarDalRiFilho/dev-hiring-challenge.git
```
ou download arquivo compactado(zip)
```bash
https://github.com/MelsarDalRiFilho/dev-hiring-challenge/archive/refs/heads/master.zip

```

### Configurar o ambiente

Para acesso o GitHub, esta aplicação utiliza autenticação através do Token do usuário. 
No link abaixo, encontra-se instruções de como gerar este token. 

- Creating a personal access token: <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>

Para registrar o na aplicação:

- no diretório ./web
- crie um arquivo com o nome ".secrets.toml"
- Adicione o conteúdo abaixo:

```bash
[default]
GITHUB_ACCESS_TOKEN = "seu_token"
```

- Substituindo seu_token pelo token a ser utilizado

[OPCIONAL] Esta aplicação está configurada para operar na porta 5000. Caso esta porta já esteja
sendo utilizada em seu ambiente, altere a porta nos seguintes arquivos:

- ./docker-compose.yml
- ./web/Dockerfile


### Instalar e iniciar a aplicação

No diretório onde está o arquivo "docker-compose.yml"

```bash
docker-compose up -d 
```

Após a conclusão da instalação, acessar o sistema em seu navegador de preferência.

```bash
http://localhost:5000
```

Caso queira consultar a base de dados:

```bash
http://localhost:8081
```
- informe os seguintes campos:

    ```bash
    Servidor: dbmysql
    Usuário: root
    Senha: desatw21
    Base de dados: "pode ficar em branco"
    ```

- A aplicação utiliza 2 bancos:
     - atw_dev_challenge: registro das pesquisas realizadas
     - atw_dev_challenge_test: utilizado nos testes

## Instruções para executar os testes

Estando com os conteiners ativos:

```bash
docker exec -it atwchallenge_web pytest -v
```

## Instruções para desativar a aplicação

Estando com os conteiners ativos:

```bash
docker-compose down
```

# Desafio técnico proposto

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

