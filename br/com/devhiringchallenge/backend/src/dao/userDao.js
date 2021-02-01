const connection = require('../database/connection.js');

module.exports = { 
  
  async saveAll(users) {
    users.forEach(user => this.save(user));
  },

  async save(user) {
    const [success] = await connection('users')
      .insert(user)
      .onDuplicateUpdate('login', 'avatar_url', 'url');
  }
 }