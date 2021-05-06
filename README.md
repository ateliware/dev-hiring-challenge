# Desafio técnico para desenvolvedores

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

Quando terminar, faça um Pull Request neste repo e avise-nos por email.

**IMPORTANTE:** se você não conseguir finalizar o teste, por favor nos diga o motivo e descreva quais foram as suas dificuldades. Você pode também sugerir uma outra abordagem para avaliarmos seus skills técnicos, vender seu peixe, mostrar-nos do que é capaz.

# Solução

Especificações:
* Ruby 2.7.2
* Rails 6.1
* Postgresql 13
  
  Durante a analise de quais seriam as informações mais relevantes a serem armazenadas dos repositórios, recuperados via a API de consulta do github optei em armazenar o json completo num campo jsonb no postgres, assim as informações já estarão disponiveis para qualquer consulta posterior.

  Outra abordagem foi de que a cada nova consulta os dados antigos serão removidos isto apenas para facilitar a exibição dos dados sem precisar adicionar um controle mais complexo.

  Uma particularidade, eu optei por deixar a seleção das linguagens com o usuário, podendo selecionar entre 30 linguagens.


  > Subi a aplicação no heroku no seguinte endereço: https://dev-hiring-challenge-ror.herokuapp.com

  > Apesar de o aplicativo funcionar no mobile, o layout não foi ajustado para estes tamanhos de tela, portanto a experiência agradável em telas pequenas.

# Execução

Tendo em consideração das versões do ruby, e rails após clonar o repositório é necessário apenas configurar as variáveis de ambiente localmente.
para isto basta usar o arquivo env.sample (foi mantido a master key propositalmente para fins de facilitar os testes), configurando as URLs do banco de dados.

após isso basta executar os passos padrões do ruby on rails: 
  
  1 - bundle install -> para instalar as dependencias
  2 - rake db:create / rails db:create -> para criar os bancos de dados
  3 - rake db:migrate / rails db:migrate -> para criar as tabelas necesárias

> Se for fazer o deploy no heroku, é necessário criar o app e adicionar o banco postgres, e adicionar as variável de ambiente da `RAILS_MASTER_KEY` para que o build seja executado com sucesso.

depois dos passos anteriores basta executar o comando para subir o servidor:
  `rails server` ou `rails s`

> Caso seja necessário pode usar o parametro `-b 0.0.0.0` para tornar a aplicação acessivel de outras maquinas na rede.
> Caso opte por usar o `-b` recomendo utilizar o `-p 80` para alterar a porta também fazendo com que não seja necessário informar o porta na url.
