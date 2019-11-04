class RepositoriesController < ApplicationController
  def index
    #TODO: Implement filtering by language
    @repos = Repo.all
  end
  def show
    @repo = Repo.find(params[:id])
  end
end
