class RepositoriesController < ApplicationController
  include HTTParty
​
  def index
    @results = Repository.all
  end
​
  def search
    if params['query'].present?
      @query = params["query"]
      search_url = "https://api.github.com/search/repositories?q=topic:#{@query}"
      @results = HTTParty.get(search_url, format: :json)
    end
​
  end
​
  def create
    repo_hash = params["repo"]
    @repo = Repository.new()
    @repo.full_name        = repo_hash["full_name"]
    @repo.html_url         = repo_hash["html_url"]
    @repo.description      = repo_hash["description"]
    @repo.stargazers_count = repo_hash["stargazers_count"]
    @repo.language         = repo_hash["language"]
    @repo.watchers_count   = repo_hash["language"]
    @repo.forks            = repo_hash["forks"]
​
    if @repo.save
      redirect_to repositories_path, notice: "Repositório salvo como favorito!"
    else
      redirect_to root_path, notice: "Tente novamente"
    end
  end
​
  private
​
  def search_params
    params.permit(:query)
  end
end
