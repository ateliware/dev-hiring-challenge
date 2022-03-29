const repositoryServices = require("../services/repositoryServices.js");

const getMostStarredRepository = async (req, res) => {
  const language = req.params.language;
  const result = await repositoryServices.getMostStarredRepository(language);
  res.json(result);
};

module.exports = { getMostStarredRepository };
