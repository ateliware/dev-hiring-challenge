const Sequelize = require('sequelize')
const sequelize = require('../_database')

const Repository = sequelize.define('repository', {
  id_repository: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  login: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.STRING
  },
  language: {
    type: Sequelize.STRING
  }
}, { 
    freezeTableName: true // disable automatic plural table name
  }
)

module.exports = Repository