const { Octokit } = require("@octokit/core");
const { Repository } = require("../models/repository");
const { User } = require("../models/user");

const userDao = require("../dao/userDao");
const repositoryDao = require("../dao/repositoryDao");

const octokit = new Octokit();


async function saveData (users, repos) {
  await userDao.saveAll(users);
  await repositoryDao.saveAll(repos);
}

module.exports = {

  async search (request, response) {

    const { page } = request.params;
    let repos = [];
    let users = [];
    
    const rawRepos = await octokit.request("GET /search/repositories", {
      q: "language:typescript+language:ruby+language:go+language:C#+language:python",
      sort: "stars",
      order: "desc",
      per_page: 20,
      page: page,
    });

    rawRepos.data.items.forEach(r => {
      let owner = r.owner;
      let user = new User(owner.id, owner.login, owner.avatar_url, owner.url)
      let respository = new Repository(r.id, r.name, r.full_name, r.html_url, r.stargazers_count, r.description, r.language, owner.id);
      users.push(user);
      repos.push(respository);
    });

    // Call async function because user needs to be imported first
    saveData(users, repos);

    return response.json({repos});
  }
}