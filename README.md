# ateliware-challenge

Aplicação Dockerizada com Django e Postgres, Gunicorn, and Nginx (dois branchs um com servidor Nginx (Main) e outro sem)

Para rodar a aplicação é necessário instalar o Docker e Docker cli [Install docker](https://docs.docker.com/compose/install/) 

A aplicação possui dois arquivos dockers, sendo um para ambiente de desenvolvimento e outro para ambiente de produção

# Para rodar a aplicação

*Crie e configure inicialmente os arquivos de variáveis de ambiente conforme os exemplos gerando: .env .env.prod e .env.prod.db*

Você precisará de acesso *sudo* para os comandos a seguir 

*Em ambiente de desenvolvimento*

`$ docker-compose up -d --build`

 Criar as migrações
 
`$ docker-compose exec web python3 manage.py migrate`

 Criar usuário para área administrativa
 
`$ docker-compose exec web python3 manage.py createsuperuser`

E finalmente

`$ docker-compose up` #para levantar o serviço docker

Nesta etapa a aplicação estará rodando em:

[http://127.0.0.1:8000](http://127.0.0.1:8000)

*Em Ambiente de produção"*

Usando [gunicorn](https://gunicorn.org/)

`$ docker-compose -f docker-compose.prod.yml up -d --build`

 Criar as migrações
 
`$ docker-compose -f docker-compose.prod.yml exec web python3 manage.py migrate`

 Criar usuário para área administrativa
 
`$ docker-compose -f docker-compose.prod.yml exec web python3 manage.py createsuperuser`

E, por fim

`$ docker-compose -f docker-compose.prod.yml up` #o serviço estará rodando no servidor na porta 8000 que será necessário liberar para acesso externo

As explicações para a lógica de dockerização encontram-se no artigo disponível em:
[Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)
