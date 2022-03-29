const axios = require("axios");
const { FailedRequestError } = require("../lib/errors/failedRequest.error.js");
const { getDbByName } = require("../models/index.js");

const REPOSITORY_DB = "Repository";

const getMostStarredRepository = async (language) => {
  const repositories = await getFromDb(language);

  if (repositories.length > 0) {
    return { items: repositories };
  }

  const { status, data } = await axios.get(
    `https://api.github.com/search/repositories?sort=stars&q=stars:%3E1+language:${language}+stars:>1600&per_page=5`
  );

  if (status !== 200) {
    throw new FailedRequestError();
  }

  const { items } = data;

  for (const item of items) {
    const newItem = {
      name: item.name,
      fullName: item.full_name,
      url: item.url,
      repoId: item.id,
      stars: item.stargazers_count,
      language,
      owner: item.owner.login,
      watchers: item.watchers_count,
      cloneUrl: item.clone_url,
    };

    try {
      await getDbByName(REPOSITORY_DB).create(newItem);
    } catch (error) {
      console.log(error);
    }
  }
  return { items: await getFromDb(language) };
};

const getFromDb = async (language) => {
  const repositories = await getDbByName(REPOSITORY_DB).findAll({
    where: {
      language,
    },
  });

  return repositories ?? [];
};



module.exports = { getMostStarredRepository, getFromDb };
