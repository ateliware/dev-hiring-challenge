<h1 align="center">
    Ateliware Challenge
</h1>

<p align="center">
 <a href="#projeto">Projeto</a> •
 <a href="#homepage">Homepage</a> •
 <a href="#como-executar">Como executar</a> • 
 <a href="#tecnologias">Tecnologias</a>
</p>

## Projeto

Esta é uma aplicação proposta pela [Ateliware](https://ateliware.com/) para armazenar os repositórios destaques de 5 linguagens diferentes.

Você pode acessar uma live preview [aqui](http://54.207.96.203/) _deploy feito na aws usando terraform e docker-compose_

<br>

## Homepage
![](https://i.postimg.cc/02kX2xgt/image.png)

![](https://i.postimg.cc/66nT5JVG/image.png)


## Como executar
<br>

### Local
Configurando o ambiente local:

Necessário:

* `elixir`
* `mix`

```bash
#!/bin/bash

# copie a configuração base de desenvolvimento
cp config/sample.dev.exs config/dev.exs
# após isso, adicione suas credenciais do banco de dados
mix tailwind.install 
mix tailwind.default
mix deps.get
mix ecto.setup

# após isso você pode rodar testes com
# para isso é necessario inserir suas credenciais do banco de dados em config/test.exs
mix test

# e rodar o servidor com
mix phx.server

```
o servidor estará disponível em http://localhost:4000

<br>

### Docker Compose

Necessário:

* `docker`
* `docker-compose`

```bash
docker-compose up -d
```
O servidor e o banco serão executados e estará ouvindo em [localhost](http://localhost)

<br>

### IaC - Infrastructure as Code

Para fazer um deploy na AWS utilizando Terraform

Necessário:

* `cli-aws` <b>autenticado</b>
* `terraform`

```bash
#!/bin/bash
cd terraform

cp sample.tfvars terraform.tfvars

# preencha o arquivo criado com as credenciais necessarias
terraform init

terraform apply

# revise as alterações que serão feitas e digite 'yes' caso decida prosseguir

```

## Tecnologias
* Elixir
* Phoenix
* Phoenix Live View
* TailwindCSS
* Postgres
* Docker
* Docker Compose
* Terraform
* AWS EC2

<br> <br>
