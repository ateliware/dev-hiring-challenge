const { Repository } = require("../models/repository");

const repositoryDao = require("../dao/repositoryDao");

module.exports = {

  async saveRepository(repository) {
    await repositoryDao.saveOrUpdate(repository);
  },

  createRepository(repositoryData) {
    return new Repository(repositoryData.id,
                          repositoryData.name, 
                          repositoryData.full_name, 
                          repositoryData.html_url, 
                          repositoryData.stargazers_count, 
                          repositoryData.description, 
                          repositoryData.language, 
                          repositoryData.owner.id);
  },

  async get(request, response) {
    const { id } = request.params;
    let repository = await repositoryDao.get(id);

    return response.json({repository})
  }

};