# Desafio técnico para desenvolvedores

## Tecnologias no backend
* [Python3](https://www.python.org/)
* [Django](https://www.djangoproject.com/)
* [PostgreSQL](https://www.postgresql.org/)

## Tecnologias do frontend
* [Next com typescript](https://nextjs.org/)
* [tailwindcss](https://tailwindcss.com/)

## Exemplo

Segue um exemplo da [aplicação](https://whispering-savannah-48854.herokuapp.com/) rodando no heroku

## Funcionalidades
* Autenticação JWT
  * Refresh token automático
* Integração com API Github para trazer os repositórios
  * Paginação mostrando no máximo 10 páginas de resultado
* Possibilidade de favoritar um repositório
  * Ação só possível se estiver logado na aplicação
* Possibilidade de listar repositórios favoritados
  * Ação só possível se estiver logado na aplicação
* Sistema com design guide retro (estilo windows classic)

## Lista de requisitos solicitados/Status de realizado

- Deve ser uma aplicação totalmente nova; [DONE]
- A solução deve estar em um repositório público do GitHub; [DONE]
- A aplicação deve armazenar as informações encontradas; [DONE]
- Utilizar PostgreSQL, MySQL ou SQL Server; [DONE]
- O deploy deve ser realizado, preferencialmente, no Heroku, AWS ou no Azure; [DONE]
- A aplicação precisa ter testes automatizados; [NO]
- Preferenciamente dockerizar a aplicação; [NO]
- Por favor atualizar o readme da aplicação com passo a passo com instrução para subir o ambiente. [DONE]

# Configurando a aplicação

## Frontend

- Build
1. Setar váriavel de ambiente NEXT_PUBLIC_BACKEND_API que aponta para o backend;
2. Fazer build da aplicação

        npm run build
3. Iniciar servidor

        npm start

- Dev
1. Setar váriavel de ambiente NEXT_PUBLIC_BACKEND_API que aponta para o backend;
2. Iniciar servidor

        npm run dev

## Backend

- Build
1. Para deploy no heroku já existe um Procfile configurado no repositório. É necessário apenas criar o dyno e dar push da aplicação.

        heroku create
        git push heroku master
2. Setar váriaveis de ambiente (mesmo passos para dev)

- Dev
1. Criar venv

        python3 -m venv
2. Adicione as váriaveis de ambiente ao final do arquivo "env/bin/activate". (No caso de heroku utilizar o comando heroku config:set para configurar as variáveis)

        DATABASE_URL                            : Url de conexão com a base de dados
        DEV_HIRING_CHALLENGE_ALLOWED_HOST       : Urls separadas por ", " que serão permitidos ser feito requisições
        DEV_HIRING_CHALLENGE_FRONTEND_HOST      : Urls separadas por ", " de domínios front que devem liberar os CORS
        DEV_HIRING_CHALLENGE_GITHUB_TOKEN       : Token de credencial para consultar a api do github
        DEV_HIRING_CHALLENGE_GITHUB_USERNAME    : Nome de usuário usado como credencial para consultar a api do github

3. Configurar banco de dados

        source env/bin/activate
        python manage.py migrate

4. Subir aplicação

        python manage.py runserver 0:8000
