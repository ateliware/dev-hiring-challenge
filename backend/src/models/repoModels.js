const Sequelize = require('sequelize')
const database = require('../db')

const repoModels = database.define('repo',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
      },
      language:{
        type: Sequelize.STRING,
        allowNull: true
      },
      html_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

module.exports = repoModels