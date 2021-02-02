const { User } = require("../models/user");

const userDao = require("../dao/userDao");

module.exports = {

  async saveUser(user) {
    return await userDao.saveOrUpdate(user);
  },

  createUser(userData) {
    let user = new User(userData.id, userData.login, userData.avatar_url, userData.html_url);
    return user;
  },

  async get(request, response) {
    const { id } = request.params;
    let user = await userDao.get(id);
    
    return response.json({user});
  }

};