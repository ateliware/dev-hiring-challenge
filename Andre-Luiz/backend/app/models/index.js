const Sequelize = require('sequelize')
// const sequelize = new Sequelize('ateliwaredevteste', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql'
// })
const sequelize = new Sequelize('heroku_c046af8a1125f7a', 'b13d423df69031', '4372da29', {
    host: 'us-cdbr-east-03.cleardb.com',
    dialect: 'mysql'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.repositories = require('./repositories.model')(sequelize, Sequelize)

module.exports = db