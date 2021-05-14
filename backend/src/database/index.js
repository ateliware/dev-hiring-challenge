import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Repository from '../app/models/Repository';
import ProgrammingLanguage from '../app/models/ProgrammingLanguage';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Adicionar as models neste array
    [Repository, ProgrammingLanguage]
      .map((model) => model.init(this.connection))
      .forEach((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
