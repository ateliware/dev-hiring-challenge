const { Octokit } = require("@octokit/core");
const { Repository } = require("../models/repository");
const { User } = require("../models/user");

const userController = require("./userController");
const repositoryController = require("./repositoryController");

const octokit = new Octokit();

const apiRequest = "GET /search/repositories";
const apiResquestQuery = "language:typescript+language:ruby+language:go+language:C#+language:python";
const apiRequestSort = "stars";
const apiRequestOrder = "desc"; 

module.exports = {

  async saveApiData(users, repositories) {
    await userController.saveUser(users);
    await repositoryController.saveRepository(repositories);
  },

  async resquestApiData(page) {
    return octokit.request(apiRequest, {
      q: apiResquestQuery,
      sort: apiRequestSort,
      order: apiRequestOrder,
      per_page: 20,
      page: page,
    });
  },
    
  async search(request, response) {
    const { page } = request.params;
    let repos = [];
    let users = [];
    
    const apiResponse = await module.exports.resquestApiData(page);

    apiResponse.data.items.forEach(r => {
      users.push(userController.createUser(r.owner));
      repos.push(repositoryController.createRepository(r));
    });

    module.exports.saveApiData(users, repos);

    return response.json({repos});
  }
}