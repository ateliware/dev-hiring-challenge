const connection = require('../database/connection.js');
const {attachOnDuplicateUpdate} = require('knex-on-duplicate-update');

attachOnDuplicateUpdate();

module.exports = { 
  async save(repository) {
    const [success] = await connection('repos')
      .insert(repository)
      .onDuplicateUpdate('name', 'stars', 'description', 'language');
    return success;
  }
 }