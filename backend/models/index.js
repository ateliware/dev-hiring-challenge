const sequelize = require('../_database')

const models = {
  repository: require('./repository'),
  sequelize: sequelize
}

module.exports = models