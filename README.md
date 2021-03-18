# ATELIWARE x JOHNATHAN R.
#### Desafio Técnico - Full Stack;

Considerações por Email (a/c Karina).

O resultado final está disponível [aqui](https://appoks-atw-devchallenge.herokuapp.com/). 
Neste caso, fiz o deploy direto do repo `webapi` no GitHub. 


## Setup do Ambiente - Desenvolvimento

- Prepare uma pasta para os repositórios:
    ```bash
    mkdir atw+jrn && cd atw+jrn
    ```

- Faça o clone dos repositórios. No exemplo, usando ssh
    ```
    git clone git@github.com:appoks/atw-devchallenge-webapi.git
    git clone git@github.com:appoks/atw-devchallenge-frontend.git
    ```

Eles estão disponíveis aqui: [Rails API](https://github.com/appoks/atw-devchallenge-webapi), [Vue FrontEnd](https://github.com/appoks/atw-devchallenge-frontend).
Incluí como submodulos neste PR.

<br/>

___ 
<br/>


## Para iniciar o backend:

- Entre na pasta `atw-devchallenge-webapi`.

    ```
    cd atw-devchallenge-webapi
    ```

- Altere o arquivo de configurações do database para que corresponda à sua máquina. No meu caso, utilizo usuário e senha 'postgres'. 

- Faça a instalação das dependências.

    ```
    bundle install
    ```

- Rode as migrações e o seed do banco. 

    ```
    rake db:create && rake db:migrate && rake db:seed
    ```
- Por fim, rails!

    ```
    rails s
    ```

Ao acessar o endereço `localhost:3000` você já verá o frontend compilado em sua última versão.
    
Para simplificar, mantive a SPA junto da API, então não me preocupei com namespaces ou deixar os recursos em uma rota com /api/, por exemplo. Eu sempre prefiro deixar separado, mas nesse caso não pareceu valer a pena... 

as rotas habilitadas para esta api são:
    - GET /languages
    - GET /languages/:id
    - GET /repositories/
    - GET /repositories/:id/
    - PUT /repositories/:id (aceitando apenas a atualização do parâmetro 'last_activity')
<br/>

___ 
<br/>

## Para iniciar o frontend:

- Entre na pasta `atw-devchallenge-frontend`

    ```
    cd atw-devchallenge-frontend
    ```

- Altere o arquivo de configuração da api (`src/services/api.js`) para satisfazer ao seu ambiente. Neste exemplo estamos utilizando `http://localhost:3000`. Ou utilize os arquivos de ambiente que eu deveria ter utilizado... 

- Faça a instalação das dependências

    ```
    npm install
    ```

- Para executar o servidor de desenvolvimento... 

    ```
    npm run serve
    ```
<br/>

___ 
<br/>

## Deploy - Heroku

Primeiramente, faça login no heroku via CLI.

```
heroku login
```

Este procedimento corresponde à mesma forma que eu fiz para deixar o app disponível no heroku [aqui](https://appoks-atw-devchallenge.herokuapp.com/). Normalmente eu mantenho a SPA em um outro dyno por costume, mas para casos pequenos assim acho que faz sentido manter a aplicação inteira junta.

#### Rails API + Vue App

Para fazer o deploy do SPA juntamente com a aplicação rails, faça o build do projeto Vue e copie os arquivos resultantes para a pasta public da aplicação Rails. 

- Crie uma nova aplicação utilizando o CLI do heroku:

    ```
    heroku apps:create <nome>
    ```
    
    Caso nenhum nome seja especificado, o heroku criará um aleatoriamente. 

- Altere o arquivo de configuração da api (`src/services/api.js`) para satisfazer ao seu ambiente. 

    Por exemplo, `https://enigmatic-everglades-40841.herokuapp.com/`. 

- Faça o build do projeto em Vue

    ```
    cd atw-devchallenge-frontend && npm run build
    ```

- Após finalizado, copie para dentro do projeto Rails

    ```
    cp ./dist/* ../atw-devchallenge-webapi/public -r --f
    ```

- Vá até o projeto Rails

    ```
    cd .. && cd atw-devchallenge-webapi
    ```

- Adicione o aplicativo criado anteriormente e adicione o DB

    ```
    heroku git:remote -a <nome>
    heroku addons:create postgres
    ```

- Envie o código para o heroku
    ```
    git push heroku main
    ```

- Neste momento, você deve ser capaz de acessar o ambiente pela URL que a própria CLI do heroku fornecer. Antes de ir até lá, faça a migração e o seed do banco de dados.

    ```
    heroku run rake db:migrate
    heroku run rake db:seed
    ```

- Agora sim, acesse o aplicativo e verifique o funcionamento.

