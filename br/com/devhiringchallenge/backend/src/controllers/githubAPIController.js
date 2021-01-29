const { Octokit } = require("@octokit/core");
const { Repository } = require("../models/repository");

const octokit = new Octokit();

module.exports = {
  async search (request, response) {

    let repos = [];
    
    const rawRepos = await octokit.request("GET /search/repositories", {
      q: "language:java+language:c+language:Ruby+language:python+language:PHP",
      sort: "stars",
      order: "desc",
      per_page: 20,
      page: 1 
    });

    rawRepos.data.items.forEach(r => {
      repos.push(new Repository(r.name, r.html_url, r.stargazers_count, r.description));
    });

    return response.json({repos});
  }
}