const axios = require('axios');
const Sequelize = require('sequelize')

const models = require('../models');

const getLanguage = async (request, response) => {
  const language = request.params.language;
  
  const data = await models.repository.findAll({ 
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('language')),
      Sequelize.fn('lower', language)
    ),
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } 
  })

  if (data.length > 0) {    
    return response.json(data)
  } 

  try {
    const resultQuery = await axios.get(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);
    const repositories = []

    resultQuery.data.items.forEach(repo => {
      const repository = { 
        id_repository: repo.id,
        name: repo.name,
        login: repo.owner.login,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
      }
      repositories.push(repository)
    })
    
    saveRepository(repositories)
  
    return response.json(repositories);
  } catch(err) {
    return response.json({ error: "language not found" })
  }
}

const saveRepository = repositories => {
  repositories.forEach(async repo => {
    await models.repository.create({ 
      id_repository: repo.id_repository,
      name: repo.name,
      login: repo.login,
      url: repo.url,
      stars: repo.stars,
      language: repo.language,
    })
  })
}

module.exports = {
  getLanguage
}