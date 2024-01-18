const Sequelize = require('sequelize')
const database = require('../db')

const repoModels2 = database.define('repo',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    html_url:{
        type: Sequelize.STRING,
        allowNull: false
      },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

module.exports = repoModels2