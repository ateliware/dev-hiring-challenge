import { Model, DataTypes } from 'sequelize';

class ProgrammingLanguage extends Model {
  static init(sequelize) {
    super.init(
      {
        github_login: DataTypes.STRING,
        name: DataTypes.STRING,
      },
      { sequelize },
    );
    return this;
  }

  static associate({ Repository }) {
    this.hasMany(Repository, {
      as: 'repositories',
    });
  }
}

export default ProgrammingLanguage;
