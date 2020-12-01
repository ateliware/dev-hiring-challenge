class RepositoryController < ApplicationController

#  before_action :sanitize_params
  
  def index
    repos = Repository.all
    repos = repos.map do |repo|
      {id: repo.id, name: repo.name, description: repo.description, 
      language: repo.language, stars: repo.stars, url: repo.url}
    end
    respond_to do |format|
      format.any(:html, :js, :json) {render json: {results: repos}.to_json, status: :ok}      
    end 
  end
  
  def new
    @repository = Repository.find_by(name: params["name"])
    if @repository.blank?
      @repository = Repository.new
      @repository.name = params["name"]
      @repository.description = params["description"]
      @repository.language = params["language"]
      @repository.stars = params["stars"]
      @repository.url = params["url"]
      @repository.save
    end
    render json: {results: @repository}.to_json, status: :ok
  end
  
  def exists
    result = false
    if Repository.exists?(name: params["name"])
      result = true
    end
    render json: {result: result}.to_json, status: :ok
  end

end
