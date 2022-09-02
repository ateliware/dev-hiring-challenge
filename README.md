# README

Ferramentas utilizadas
Para o desenvolvimento do projeto, foram utilizados as principais ferramentas:
Ruby on Rails
Docker
PostgreSQL

Rodando a aplicação
É necessário possuir o Docker.
Caso tudo esteja certo, siga o passo a passo abaixo:
Clone o repositório em sua maquina utilizando:
  $ git clone https://github.com/lucasspanholo/Dev-Hiring-Challenge.git
Instale as dependências do projeto rodando o seguinte comando:
  $ docker-compose up
Após finalizar o comando acima feche o servidor "Ctrl+C" e rode:
  $ docker-compose run app rails db:create db:migrate
Agora é só rodar o comando abaixo e pronto, já está configurado e funcional a aplicação!
  $ docker-compose up
Se tudo estiver certo, irá iniciar no endereço http://localhost:3000