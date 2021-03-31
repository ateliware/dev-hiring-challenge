require 'net/http'
require 'uri'

class GithubService
  def call
    Language.all.each do|language|
      api_url = "https://api.github.com/search/repositories?q=language:#{language.name.downcase}%20stars:%3E=1000&sort=stars&order=desc"

      uri = URI(api_url)

      response = Net::HTTP.get_response(uri)
      body_parsed = JSON.parse(response.body)
      
      repositories = body_parsed['items']

      if repositories.any?
        repositories.each do |_repository|
          Repository.find_or_create_by(name: _repository['name']) do |repository|
            repository.name = _repository['name']
            repository.owner_avatar = _repository['owner']['avatar_url']
            repository.description = Base64.encode64(_repository['description']) if _repository['description']
            repository.html_url = _repository['html_url']
            repository.home_page = _repository['homepage']
            repository.stargazers_count = _repository['stargazers_count']
            repository.language = language
          end  
        end
      end
    end
  end
end