const sequelize = require('../_database')

const models = {
  // language: require('./language'),
  repository: require('./repository'),
  sequelize: sequelize
}

module.exports = models