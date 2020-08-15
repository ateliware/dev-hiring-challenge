require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  operatorsAliases: false, //evita warnings
  logging: false, //não mostra todos os logs
  define: {
    timestamps: true, //força pro br
    underscored: true, //campos da tabela com underline
    underscoredAll: true, //tudo com underline
  }
}