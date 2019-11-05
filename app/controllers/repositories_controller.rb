class RepositoriesController < ApplicationController
  def index
    language = params[:language].downcase if params[:language]
    if !language
      @repos = Repo.all
    elsif @languages_list.include? language
      @repos = Repo.where('lower(language) = ?', language)
    else
      @repos = []
    end
  end
  def show
    @repo = Repo.find(params[:id])
  end
end
