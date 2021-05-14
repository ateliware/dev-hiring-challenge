module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      programming_language_id: {
        type: Sequelize.INTEGER,
        references: { model: 'programming_languages', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      html_url: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      fork: {
        type: Sequelize.BOOLEAN,
      },
      clone_url: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      forks_count: {
        type: Sequelize.INTEGER,
      },
      open_issues: {
        type: Sequelize.INTEGER,
      },
      default_branch: {
        type: Sequelize.STRING,
      },
      subscribers_count: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('repositories');
  },
};
