import { Model, DataTypes } from 'sequelize';

class Repository extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        programming_language_id: DataTypes.INTEGER,
        full_name: DataTypes.STRING,
        html_url: DataTypes.STRING,
        description: DataTypes.STRING,
        fork: DataTypes.BOOLEAN,
        clone_url: DataTypes.STRING,
        language: DataTypes.STRING,
        forks_count: DataTypes.INTEGER,
        open_issues: DataTypes.INTEGER,
        default_branch: DataTypes.STRING,
        subscribers_count: DataTypes.INTEGER,
      },
      { sequelize },
    );
    return this;
  }

  static associate({ ProgrammingLanguage }) {
    this.belongsTo(ProgrammingLanguage, {
      as: 'programming_language',
    });
  }
}

export default Repository;
