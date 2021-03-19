# Solução proposta

Foi desenvolvida uma solução utilizando Python + Django. A aplicação lista os repositórios destaques das linguagens Java, Python, Ruby, Rust e Go. 

## Funcionalidades

- A aplicação permite atualizar/salvar (botão "Atualizar") os repositórios no banco de dados, bem como limpar/deletar (botão "Limpar");
- A aplicação permite visualizar mais detalhes dos repositórios encontrados (clicar no nome do repositório listado); e
- A aplicação armazena os dados consumidos da API do GitHub no banco de dados (PostgreSQL).

A aplicação está disponível em: https://biankatpas-dhc.herokuapp.com/

## Ambiente de Desenvolvimento 
### Iniciar o ambiente utilizando docker-compose

`docker-compose build`

`docker-compose up -d`

`docker-compose exec web python manage.py migrate`

### Acesso (localhost)

O acesso ao sistema se dá via WebBrowser através do endereço `127.0.0.1:8000`

## Testes

##### todo
- Testes automatizados
- Pull Request e notificação por email
