# Solução proposta

Foi desenvolvida uma solução utilizando Python + Django. A aplicação lista os repositórios destaques das linguagens Java, Python, Ruby, Rust e Go. 

## Funcionalidades
- Atualizar/salvar (botão "Atualizar") os dados consumidos da API do GitHub no banco de dados (PostgreSQL);
- Limpar/deletar (botão "Limpar") os repositórios da base de dados; e
- Visualizar mais detalhes dos repositórios encontrados (clicar no nome do repositório listado);

A aplicação está disponível em: https://biankatpas-dhc.herokuapp.com/

## Ambiente de Desenvolvimento 

### Iniciar o ambiente utilizando docker-compose

#### Build

`docker-compose build`

#### Start

`docker-compose up -d`

#### Banco de dados
`docker-compose exec web python manage.py migrate`

### Acesso (localhost)

O acesso ao sistema se dá via WebBrowser através do endereço: [127.0.0.1:8000](http://127.0.0.1:8000)

## Testes

### Models

`docker-compose exec web python manage.py test app.tests.test_models`

### Views

`docker-compose exec web python manage.py test app.tests.test_views`
