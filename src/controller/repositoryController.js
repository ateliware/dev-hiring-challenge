import * as repositoryServices from "../services/repositoryServices.js";

const getMostStarredRepository = async (req, res) => {
  const language = req.params.language;
  const data = await repositoryServices.getMostStarredRepository(language);
  res.json({ data });
};

export { getMostStarredRepository };
