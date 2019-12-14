
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    repositoryId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    href: DataTypes.STRING,
    avatar: DataTypes.STRING

  }, {});

  Comment.associate = function (models) {
    Comment.belongsTo(models.Repository, {
      foreignKey: 'repositoryId',
      as: 'repository'
    });
  };
  return Comment;
};