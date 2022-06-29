# ateliware-dev-hiring-challenge

## Tecnologias usadas

A aplicação foi desenvolvida 100% com TypeScript, tanto no frontend quanto no backend. Abaixo, segue as tecnologias escolhidas da linguagem que tornou possível o desenvolvimento do desafio.

### Frontend

- Para a implementação do frontend, foi escolhido o [React – A JavaScript library for building user interfaces.](https://reactjs.org/)

- Como alternativa para [Create React App](https://create-react-app.dev/), foi escolhido o [Vite.](https://vitejs.dev/)

- Para a parte de UI da aplicação, foi utilizado o pacote [Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.)](https://chakra-ui.com/)

### Backend

- Para a implementação da API, foi escolhido o framework [NestJS - A progressive Node.js framework.](https://nestjs.com/)

- Como ORM, foi escolhido o [Prisma.](https://www.prisma.io/)

- Como banco de dados foi escolhido o [MySQL.](https://www.mysql.com/)

## Heroku

O deploy da aplicação completa (frontend, backend e banco de dados) foi feita no heroku. Segue o link: [dev-hiring-challenge](google.com)

## Rodando a aplicação localmente

Como o frontend e o backend foram feitos em [NodeJS (Run JavaScript Everywhere)](https://nodejs.dev/), o procedimento para inicialização é bem parecido.

1. O primeiro passo é, obviamente, ter o node instalado na máquina. Link para download no site oficial: [Download | Node.js (nodejs.org)](https://nodejs.org/pt-br/download/)

2. Com o node instalado, é preciso ter algum gerenciador de pacotes instalado na máquina como o [npm](https://www.npmjs.com/), o [Yarn - Package Manager](https://yarnpkg.com/) ou o [pnpm](https://pnpm.io/). Para a elaboração deste README foi utilizado o Yarn mas o procedimento para as outras opções não difere muito, tendo algumas particularidades de sintaxe. Uma postagem que faz uma breve comparação entre os três: [JavaScript Package Managers: NPM Vs YARN Vs PNPM (atatus.com)](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/).

3. Após clonar o repositório na sua máquina, é necessário configurar as variáveis de ambiente para o correto funcionamento da aplicação. Em cada um dos diretórios, crie um arquivo `.env` e preencha como abaixo (lembrando que o seu MySQL pode ter configurações diferentes da minha, isso é só um exemplo de URL MySQL aceito pelo Prisma).

   ```
   # .env do frontend
   VITE_BACKEND_URL=http://localhost:3000
   ```

   ```
   #.env do backend
   DATABASE_URL=mysql://root:master1234@localhost:3306/ateliware-dev-hiring-challenge
   GITHUB_REST_API_ENDPOINT=https://api.github.com
   ```

4. Dentro de cada diretório (frontend ou backend), executar o seguinte comando (ele serve para instalar as dependências necessárias para execução da aplicação):

   ```bash
   yarn
   ```

5. No backend, são necessários mais alguns passos. Passos esses que permitem a conexão da API com o banco de dados (nessa hora é importante checar se o serviço do mysql está funcionando corretamente na sua máquina). Execute o seguinte comando (após ele, um database chamado ateliware-dev-hiring-challenge deve ter sido criado no seu MySQL):

   ```bash
   npx prisma migrate dev
   ```

6. Para executar os testes unitários (no diretório do backend):

   ```bash
   yarn test
   ```

7. Para inicializar o frontend:

   ```bash
   yarn dev
   ```

8. Para inicializar o backend:

   ```bash
   yarn start:dev
   ```
