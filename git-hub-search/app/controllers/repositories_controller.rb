require "httparty"

class RepositoriesController < ApplicationController
  rescue

  def index
    @query = params["query"]
    @results = nil
    if @query.present?
      search_url = "https://api.github.com/search/repositories?q=topic:#{@query["lenguage"]}"
      @results = HTTParty.get(search_url, format: :json)
    end
  end

  def search
  end


  def show
  end

  private

  def search_params
    params.permit(:query, :lenguage)
  end
end
