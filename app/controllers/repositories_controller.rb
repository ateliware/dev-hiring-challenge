require 'net/http'
class RepositoriesController < ApplicationController
  URL = 'https://api.github.com/search/repositories'.freeze

  before_action :fetch_current_user, only: %i[index results_api create destroy]

  def index
    @repositories = @user.repositories
  end

  def search; end

  def results_api
    data = search_in_api(param_language, param_query)
  rescue StandardError
    @repositories = nil
    raise 'Unable to retrieve data from GitHub'
  else
    @repositories = get_repositories(data) unless data['message'] == 'Not Found'
    @repositories&.map do |repository|
      @repository_user = Repository.new
      @repository_user = Repository.find_by(user_id: @user.id, owner: repository.owner,
                                            name: repository.name)
      repository.id = @repository_user.id if @repository_user
    end
  end

  def create
    @repository = @user.repositories.create(param_repository)
    @user.save!
    redirect_back fallback_location: root_path
  end

  def destroy
    @repository = @user.repositories.find(param_repository[:id])
    @repository.destroy
    redirect_back fallback_location: root_path
  end

  private

  def param_repository
    params.require(:repository).permit(:name, :description, :language, :html_url, :owner, :id)
  end

  def param_query
    params.require(:query)
  end

  def param_language
    params.require(:language)
  end

  def fetch_current_user
    @user = User.find_by(id: session[:user_id])
  end

  def search_in_api(language, query)
    url = URI(URL)
    params = { q: query + '+language:' + language, sort: 'stars', order: 'desc' }
    begin
      url.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(url)
      JSON.parse(res.body)
    rescue StandardError
      raise StandardError, 'Unable to retrieve data'
    end
  end

  def get_repositories(data)
    @repositories = []
    data['items'].each do |item|
      @repository = Repository.new do |r|
        r.name = item['name']
        r.owner = item['owner']['login']
        r.description = item['description']
        r.language = item['language']
        r.html_url = item['html_url']
      end
      @repositories.append(@repository)
    end
    @repositories
  end
end
