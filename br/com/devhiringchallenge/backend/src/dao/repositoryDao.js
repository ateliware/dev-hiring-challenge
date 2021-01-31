const connection = require('../database/connection.js');
const {attachOnDuplicateUpdate} = require('knex-on-duplicate-update');

attachOnDuplicateUpdate();

module.exports = { 
  
  async saveAll(repositories) {
    repositories.forEach(repository => this.save(repository));
  },

  async save(repository) {
    const [success] = await connection('repos')
      .insert(repository)
      .onDuplicateUpdate('name','full_name', 'stars', 'description', 'language');
  }
 }