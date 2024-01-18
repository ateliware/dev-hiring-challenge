# DesafioApi
Conectar com API do GitHub

utilizeio o sequelize para uso com o mySql
usei o dotenv
usei cors - para comunicação do front com o meu back
usei o helmet - proteção de segurança basica de 11 ataques
usei o axios - para pacotes http client

criar banco
npx sequelize-cli db:create 

Rodar a migration
npx sequelize-cli db:migrate

rodar o primeiro insert
npx sequelize-cli db:seed:all