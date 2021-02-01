const { User } = require("../models/user");

const userDao = require("../dao/userDao");

module.exports = {

  async get (request, response) {
    const { id } = request.params;
    let user = await userDao.get(id);
    
    return response.json({user});
  }

};