class RepositoriesController < ApplicationController
  before_action :set_repository, only: [:show]

  def index
    @language = params[:language] || "Ruby"

    rep_search = RepositoriesSearch.new(language: @language)
    rep_search.save!

    @repositories = Repository.where('lower(language) = ?', @language.downcase).order(stargazers_count: :desc)
  end

  def show
  end

  private

  def set_repository
    @repository = Repository.find(params[:id])
  end
end
