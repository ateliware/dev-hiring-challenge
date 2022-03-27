'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Repository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Repository.init({
    name: DataTypes.STRING,
    id: DataTypes.INTEGER,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Repository',
  });
  return Repository;
};