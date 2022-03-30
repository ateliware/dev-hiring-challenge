module.exports = (sequelize, DataTypes) => {
  const GitRepos = sequelize.define('GitRepos', {
    name: DataTypes.STRING,
    language: DataTypes.STRING,
    description: DataTypes.STRING,
    user: DataTypes.STRING,
    userImage: DataTypes.STRING,
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
    stars: DataTypes.INTEGER,
    watchs: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    issues: DataTypes.INTEGER,
    url: DataTypes.STRING,
  });
  return GitRepos;
};
