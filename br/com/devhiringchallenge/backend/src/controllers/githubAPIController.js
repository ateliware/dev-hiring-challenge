const { Octokit } = require("@octokit/core");
const { Repository } = require("../models/repository");
const repositoryDao = require("../dao/repositoryDao");

const octokit = new Octokit();

module.exports = {
  async search (request, response) {

    let repos = [];
    
    const rawRepos = await octokit.request("GET /search/repositories", {
      q: "language:typescript+language:ruby+language:go+language:C#+language:python",
      sort: "stars",
      order: "desc",
      per_page: 100,
      page: 1 
    });

    rawRepos.data.items.forEach(r => {
      let respository = new Repository(r.name, r.html_url, r.stargazers_count, r.description, r.language);
      repos.push(respository);
    });

    repositoryDao.saveAll(repos);

    return response.json({repos});
  }
}