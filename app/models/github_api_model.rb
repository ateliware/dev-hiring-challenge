class GithubApiModel < ApplicationRecord
  require 'rest_client'

  @url

  def self.getData
    response = RestClient.get(@url, { :content_type => :json, "Authorization" => ENV['GITHUB_TOKEN'] })
  end

  def self.retrieve_language_repo(language_name)
    @url = "https://api.github.com/search/repositories?q=language:#{language_name}&per_page=1"
    parsed_json = JSON.parse(GithubApiModel.getData)
    parsed_json["items"][0]
  end
end
