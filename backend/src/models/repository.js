"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Repository extends Model {}
  Repository.init(
    {
      name: DataTypes.STRING,
      fullName: DataTypes.STRING,
      url: DataTypes.STRING,
      repoId: DataTypes.INTEGER,
      stars: DataTypes.INTEGER,
      language: DataTypes.STRING,
      owner: DataTypes.STRING,
      watchers: DataTypes.INTEGER,
      cloneUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Repository",
    }
  );
  return Repository;
};
