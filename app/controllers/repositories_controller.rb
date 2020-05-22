class RepositoriesController < ApplicationController
  def index
    github = Github.new
    @repositories = github.search_repositories
  end

  def show
    @repository = Repository.find_by(id: params[:id])
    if @repository == nil
      github = Github.new
      repository = github.repositories(params[:id])
      @repository = Repository.create(
        id: repository['id'],
        node_id: repository['node_id'],
        name: repository['name'],
        full_name: repository['full_name'],
        description: repository['description'],
        stargazers_count: repository['stargazers_count'],
        watchers_count: repository['watchers_count'],
        language: repository['language'],
        forks_count: repository['forks_count'],
        open_issues_count: repository['open_issues_count']
      )
    end
  end
end
