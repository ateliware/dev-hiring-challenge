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

  def fetch_data
    FetchRepoDataJob.perform_later
    respond_to do |format|
      format.html { redirect_to '/', notice: 'Data fetching job started. May take a while...' }
    end
  end

  def clear_data
    Repo.delete_all
    respond_to do |format|
      format.html { redirect_to '/', notice: 'All data cleared.' }
    end
  end

end
