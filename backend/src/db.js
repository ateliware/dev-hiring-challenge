const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME || 'desafioapi',
    process.env.DB_USER || 'root',
    process.env.DB_PWD,{
        
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || 'localhost',
    }
)

module.exports = sequelize