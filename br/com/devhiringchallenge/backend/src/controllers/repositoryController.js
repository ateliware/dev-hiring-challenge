const { Repository } = require("../models/repository");

const repositoryDao = require("../dao/repositoryDao");

module.exports = {

  async get (request, response) {
    const { id } = request.params;
    let repository = await repositoryDao.get(id);

    return response.json({repository})
  }

};