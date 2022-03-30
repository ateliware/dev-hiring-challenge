/* eslint-disable no-extra-boolean-cast */
const Repos = require('./Repos.json');

const mockCreate = (Instance, data) => {
  if (!data) {
    return 'Error';
  }

  const newData = data;

  if (!!Instance[0].id) {
    newData.id = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const GitRepos = {
  create: async (data) => mockCreate(Repos, data),
  findAll: async () => Repos,
};

module.exports = { GitRepos };
