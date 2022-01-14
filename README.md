<h1 align="center">
    Ateliware Challenge
</h1>

<p align="center">
 <a href="#-projeto">Projeto</a> •
 <a href="#-Homepage">Homepage</a> •
 <a href="#-como-executar">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
</p>

## Projeto

Esta é uma aplicação proposta pela [Ateliware](https://ateliware.com/) para armazenar os repositórios destaques de 5 linguagens diferentes.

Você pode acessar uma _live preview_ [aqui](http://54.232.54.3/) <br> deploy feito na aws usando terraform e docker-compose

<br>

## Homepage
![](https://i.postimg.cc/02kX2xgt/image.png)
![](https://i.postimg.cc/66nT5JVG/image.png)


## Como executar
<br>

Configurando o ambiente local:
  ##### Necessita ter o _elixir_ e suas ferramentas instaladas

  ```bash
  # copie a configuração base de desenvolvimento
  cp config/sample.dev.exs config/dev.exs
  # após isso, adicione suas credenciais do banco de dados 
  mix deps.get
  mix ecto.setup

  # após isso você pode rodar testes com
  mix test

  # e rodar o servidor com
  mix phx.server
  
  # o servidor estará disponível em localhost:4000
  ```
<br>

  Utilizando docker compose:
  ##### necessita ter docker e docker-compose instalado
  
  ```bash
  docker-compose up -d
  ```
  O servidor e o banco serão executados e estará ouvindo em `localhost`


