'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Repositories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      repoId: {
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING,
      },
      owner: {
        type: Sequelize.STRING,
      },
      watchers: {
        type: Sequelize.INTEGER,
      },
      cloneUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Repositories');
  }
};