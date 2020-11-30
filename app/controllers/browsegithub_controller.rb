class BrowsegithubController < ApplicationController

  def index
    repos = Repository.all
    repos = repos.map do |repo|
      {id: repo.id, name: repo.name, description: repo.description, 
      language: repo.language, stars: repo.stars}
    render json: {results: repos}.to_json, status: :ok
    end
  end
  
  def repositories
  end
end
