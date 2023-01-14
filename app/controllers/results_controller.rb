require 'uri'

class ResultsController < ApplicationController
  def index
    @languages = Language.all
    @results = @languages.map do |language|
      repository_response = GithubApiModel.retrieve_language_repo(language.name)
      begin
        repository = Repository.find_by(github_id: repository_response['id'])
      rescue => e
        repository = Repository.create!(
          name: repository_response['name'],
          description: repository_response['description'],
          node_id: repository_response['node_id'],
          github_id: repository_response['id'],
          full_name: repository_response['full_name'],
          stars: repository_response['stargazers_count'],
          url: repository_response['html_url'],
          forks: repository_response['forks_count'],
          open_issues: repository_response['open_issues'],
          license: repository_response['license'] != nil ? repository_response['license']['name'] : nil,
          origin_created_at: DateTime.parse(repository_response['created_at']),
          origin_updated_at: DateTime.parse(repository_response['updated_at']),
          topics: repository_response['topics'],
          language: language
          )
          repository
      end
      repository
    end
  end
end
