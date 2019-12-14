
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    language: DataTypes.STRING,
    languageColor: DataTypes.STRING,
    stars: DataTypes.STRING,
    forks: DataTypes.STRING,
    currentPeriodStars: DataTypes.STRING,
    builtBy: DataTypes.INTEGER,
  }, {});
  
  Repository.associate = function (models) {
    Repository.hasMany(models.Comment, {
      foreignKey: 'repositoryId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };
  return Repository;
};