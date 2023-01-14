require 'uri'
require 'httparty'

class ResultsController < ApplicationController
  def index
    @languages = Language.all
    @results = @languages.map do |language|
      puts "\naqui foi #{language.name}\n"
      uri = URI.parse("https://api.github.com/search/repositories?q=language:#{language.name}&per_page=1")
      res = HTTParty.get(uri, {
        headers: {
          "User-Agent" => "Httparty",
          "Authorization" => ENV['GITHUB_TOKEN']
        }
      })

      if res.code == 200
        res_body_json = ActiveSupport::JSON.decode(res.body)
        repository = res_body_json['items'][0]
      else
        return
      end
      begin
        new_repository = Repository.find_by(github_id: repository['id'])
        puts "\n#{new_repository.name} repo existente\n"
        new_repository
      rescue => e
        puts "\nrepo nao existente\n"
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
          license: repository['license'] != nil ? repository['license']['name'] : nil,
          origin_created_at: DateTime.parse(repository['created_at']),
          origin_updated_at: DateTime.parse(repository['updated_at']),
          topics: repository['topics'],
          language: language
          )
          puts "\nrepo adicionado\n"
          new_repository
      end
      new_repository
    end
    puts "\n\n#{@results.length()}\n\n"
    @results.compact.length() > 0 ? @results.compact : []
  end
end
