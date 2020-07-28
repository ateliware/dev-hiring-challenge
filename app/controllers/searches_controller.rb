class SearchesController < ApplicationController
  def index
    if params['q'].present?
      @search_term = params['q'].capitalize
      search = @search_term.split(' ').first(5).map do |term|
        Search.create(language: term)
        "language:#{term}"
      end.join('+')
      response = RestClient.get "https://api.github.com/search/repositories?q=#{search}"
      @json = JSON.parse response
    end
  end

  def new
    @params = params
    @search = Search.new()
    @search.description = params[:description]
    @search.name = params[:name]
    @search.language = params[:language]
  end

  def show
  end

  def create
    @search = Search.new()
      if @search.save
        redirect_to search_path, notice: "Your search has been saved!"
      else
        render :new
      end
  end

  private

  def search_params
    params.require(:search).permit(:name, :description, :language, :stargazers_count, :forks, :favorite)
  end

  def view_params
    params.require(:search).permit(:description, :forks, :language, :name, :stargazers_count)
  end

end
