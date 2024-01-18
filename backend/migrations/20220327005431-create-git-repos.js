module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GitRepos', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      user: {
        type: Sequelize.STRING,
      },
      userImage: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      },
      stars: {
        type: Sequelize.INTEGER,
      },
      watchs: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      issues: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('GitRepos');
  },
};
