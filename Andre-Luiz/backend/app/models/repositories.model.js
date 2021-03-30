module.exports = (sequelize, Sequelize) => {
    const Repository = sequelize.define('repository', {
        git_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        full_name: Sequelize.STRING,
        language: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
        owner: Sequelize.STRING,
        stargazers_count: Sequelize.INTEGER,
        forks: Sequelize.INTEGER,
        html_url: Sequelize.STRING,
        description: Sequelize.STRING
    })

    return Repository
}