# Github Top Five!

## O projeto

Construir uma nova aplicação, utilizando algum framework de preferência pessoal (Ruby on Rails, Elixir Phoenix, Python Django ou Flask, NodeJS Sails, Java Spring, ASP.NET ou outro), a qual deverá conectar na API do GitHub e disponibilizar as seguintes funcionalidades:

- Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
- Listar os repositórios encontrados;
- Visualizar os detalhes de cada repositório.
---
## Preview
Um _live preview_ do projeto publicado pode ser consultado aqui:
> https://davis-ateliware-challenge.herokuapp.com/

## Funcionalidade
URL da API utilizada: [Github API](https://api.github.com/search/repositories?q=language:ruby&sort=stars&order=desc&per_page=1)

Para popular o banco de dados e exibir as informações dos cards (lista) de repositórios encontrados, uma consulta à API pública do Github é realizada para cada uma das linguagens escolhidas:
- [Ruby, Elixir, Python, Go, Kotlin].

Ao clicar no botão "Explorar repositórios" a lista será atualizada, trazendo as informações mais recentes retornadas para cada uma das linguagens especificadas.

Clicando em "Ver detalhes", as especificações de cada repositório poderão ser consultadas em uma tela de exibição das informações dos registros.

## Como executar em ambiente local
### Pré-requisitos
Para rodar a aplicação na máquina com um servidor local, serão necessários apenas os seguintes recursos instalados e rodando:
[Git](https://git-scm.com/downloads), [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/).

### Download do projeto e configuração do ambiente

1. Faça um clone deste repositório para a sua máquina;
2. Acesse o diretório criado, faça uma cópia do arquivo `web.env.example` para o mesmo diretório (raiz do projeto), renomeando-o para `web.env`. Este arquivo contém as credenciais para conexão ao Banco de Dados;
3. Faça o build da aplicação para criar e subir os containers (web e db), necessários para rodar o servidor;
4. Por fim, rode a criação do banco de dados e as migrações.

```bash
git clone https://github.com/davischoll/dev-hiring-challenge.git
cd dev-hiring-challenge
cp web.env.example web.env
docker-compose build
docker-compose up -d
docker-compose exec web bundle exec rails db:create db:migrate
```

5. O servidor e o banco já devem estar preparados para receber requisições. O acesso pode ser feito pelo browser, através da porta 3000:
```bash
http://localhost:3000
```

### Testes
Para executar todos os testes da aplicação:
```bash
docker-compose exec web rails test
```

---

### Construído com:
- [Docker](https://www.docker.com/get-started) - Use containers to build, share and run applications
- [Ruby 2.7.2](https://www.ruby-lang.org/en/) - A PROGRAMMER'S BEST FRIEND
- [Ruby on Rails 6.1.4](https://rubyonrails.org/) - Web application development framework
- [Posgresql](https://www.postgresql.org/) - Advanced Open Source Relational Database
- [Boostrap](https://getbootstrap.com/) - Popular front-end framework for building sites

### Contato
> [Davi Scholl](https://www.linkedin.com/in/davischoll/)