const Sequelize = require('sequelize')
const sequelize = require('../_database')

const Language = sequelize.define('language', {
  language: {
    type: Sequelize.STRING
  },
}, { 
      freezeTableName: true // disable automatic plural table name
})

module.exports = Language