# Desafio técnico para desenvolvedores

O projeto foi desenvolvido utilizando Node.js 

O código do front-end está em outro respositório

[Link repositório front-end](https://github.com/johnfaria/vue-front-challenge/)

O back-end foi desenvolvido com a linguagem TypeScript, foi utilizado o PostgreSQL como serviço (ElephantSQL) e para CI/CD foi utilizado o GitHub Actions com deploy da aplicação no Azure App Service

Algumas características importantes
* api: express 
* orm: typeorm
* configuração: node-config
* logging: pino
* http-client: axios
* autenticação: jsonwebtoken,
* testes: jest, supertest

Para o front-end foi utilizado a linguagem JavaScript com o framework Vue.js e a biblioteca de componentes Vuetify, para CI/CD foi utilizado também o GitHub Actions com deploy da aplicação no Azure App Service

A aplicação tem o seguinte fluxo

1. Usuário entra no site 
2. Cria um registro se não tem uma conta
3. Acessa o painel e escolhe cinco linguagens favoritas
4. O back-end salva as linguagens escolhidas no banco de dados associadas a cada usuário
5. É retornado os cinco repositórios mais populares de cada linguagem escolhida
6. Se o usuário voltar a usar a aplicação em outro momento, ao fazer login os repositórios das linguagens escolhidas anteriormente serão mostrados na tela
7. Usuário pode a qualquer momento trocar suas linguagens favoritas

link front-end:
[http://myapp-ci.azurewebsites.net](https://myappci-front.azurewebsites.net/)

link back-end:
[http://myapp-ci.azurewebsites.net](http://myapp-ci.azurewebsites.net)

Foi muito gratificante e desafiador desenvolver esse projeto, é a primeira vez que utilizo o banco de dados Postgres e o GitHub Actions e tive uma ótima experiência.

## Imagens
![Login](/images/login.png | width=200)

![Painel](/images/painel.png | width=200)


**Build**

```bash
npm run start
```

**Production**

```bash
npm run start
```

**Development**

```bash
npm run dev
```

**Tests**

```bash
npm run test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

Construa uma nova aplicação, utilizando o framework de sua preferência (Rails, ASP.NET, Phoenix, etc), a qual deverá conectar na API do GitHub e disponibilizar as seguintes funcionalidades:

- Botão para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
- Listar os repositórios encontrados;
- Visualizar os detalhes de cada repositório.

Alguns requisitos:

- Deve ser uma aplicação totalmente nova;
- A solução deve estar em um repositório público do GitHub;
- A aplicação deve armazenar as informações encontradas;
- Utilizar Postgres, MySQL ou SQL Server;
- O deploy deve ser realizado, preferencialmente, no Heroku ou no Azure;
- A aplicação precisa ter testes automatizados.

Quando terminar, faça um Pull Request neste repo e avise-nos por email.

**IMPORTANTE:** se você não conseguir finalizar o teste, por favor nos diga o motivo e descreva quais foram as suas dificuldades. Claro que você também pode sugerir uma outra abordagem para avaliarmos seus skills técnicos, mas é com você para vender seu peixe, mostrar-nos do que é capaz.
