require 'uri'
require 'httparty'

class ResultsController < ApplicationController
  def index
    @languages = Language.all
    @result = @languages.map do |language|
      uri = URI.parse("https://api.github.com/search/repositories?q=#{language.name}&per_page=1")
      res = HTTParty.get(uri, {
        headers: {
          "User-Agent" => "Httparty",
          "Authorization" => ENV['GITHUB_TOKEN']
        }
      })
      res_body_json = ActiveSupport::JSON.decode(res.body)
      repository = res_body_json['items'][0]
      begin
        new_repository = Repository.create!(
        name: repository['name'],
        description: repository['description'],
        node_id: repository['node_id'],
        github_id: repository['id'],
        full_name: repository['full_name'],
        stars: repository['stargazers_count'],
        url: repository['html_url'],
        forks: repository['forks_count'],
        open_issues: repository['open_issues'],
        license: repository['license']['name'],
        origin_created_at: DateTime.parse(repository['created_at']),
        origin_updated_at: DateTime.parse(repository['updated_at']),
        topics: repository['topics'],
        language: language
        )
      rescue => exception
        Repository.find_by(github_id: repository['id'])
      end
    end
  end
end
