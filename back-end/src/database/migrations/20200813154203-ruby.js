'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('rubies', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        url: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        stars: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        owner: {
          type: Sequelize.STRING,
          allowNull: false
        },
        repo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }

    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rubies')
  }
};