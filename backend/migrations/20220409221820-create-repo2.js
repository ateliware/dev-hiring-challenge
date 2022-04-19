'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('repos',{
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
      },
      language:{
        type: Sequelize.STRING,
        allowNull: false
      },
      html_url:{
        type: Sequelize.STRING,
        allowNull: false
      },
    createdAt: Sequelize.STRING,
    updatedAt: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('repos')
  }
};
