# Desafio técnico para desenvolvedores

Foi desenvolvido uma aplicação em python que faz uma requisição para a API do github
onde colocamos uma palavra que será procurada em repositorios e dizemos qual a linguaguem
que devera ser procurada, quando apertamos no botão 'Buscar' ele irá trazer as top 5 
respostas que essa API nos retorna junto com algumas descrições como o nome, descrição, URL, Linguaguem, Quando foi criado, estrelas e forks com isso ela ira salvar no banco de dados sqlite essas top 5 respostas e então temos uma aba na parte esquerda que iremos poder ver esse historico então temos duas opções que é ver todo o historico assim ele ira trazer todas pesquisas que foram feitas ou então podemos trazer um historico apenas de determinadas linguaguens como exemplo caso quisermos ver apenas os repositorios que foram feitas com a linguaguem python iremos escrever no campo de texto acima do botão e depois iremos apertar em 'Mostrar Historico', assim como também podemos limpar nosso historico então podemos limpar o historico todo apertando em 'Limpar Historico' ou podemos limpar por linguaguens especificas como exemplo caso quisermos apenas retirar do historico as linguaguens que sejam de javascript basta escrever no campo e depois apertar em 'Limpar Historico'

Foi desenvolvido juntamente um script de testes com o selenium onde ele irá fazer 50 requisições procurando por repositorios com linguaguens diferentes e palavras diferentes, foi desenvolvido um script para realizar 50 vezes a procura de historico com linguagens diferentes, foi desenvolvido um script que irá realizar 50 vezes o acionamento do botão mostrar historico sem nenhuma linguaguem especifica, foi desenvolvido um script que irá rodar 50 vezes o limpamento do historico com linguaguem especifica e também foi desenvolvido um script que irá rodar 50 vezes fazendo o acionamento do botão Limpar historico sem nenhuma linguaguem especifica

Aplicação utlizou a biblioteca Streamlit para conseguir utilizar a parte de montagem do site, foi utilizado a biblioteca requests para fazer a requsição da API do github, foi utilizando a biblioteca sqlite3 para criação e utilização do banco de dados, foi utilizado a biblioteca selenium para criação de script de teste, foi utilizado a biblioteca random para pegar aleatoricamente linguaguens e palavras e foi utilizado a biblioteca time para ele conseguir esperar alguns segundos antes de executar um proximo passo 

essa aplicação desenvolvida foi publicada no plataforma HEROKU onde é possivél acessar sem precisar rodar localmente o link da aplicação: https://bergamin-repository-search.herokuapp.com/

porém caso deseje rodar localmente esse site basta você ter todas bibliotecas citadas a cima instaladas ir até a pasta desse projeto e rodar o comando 

``` 
streamlit run init.py 
```