require 'net/http'
require 'json'

class RepositoriesController < ApplicationController
  def index
    @repository = Repository.all
  end

  def show
    @repository = Repository.where('language = ?', params[:language])
  end
  
  def new

    languages =  [
                    "Python",
                    "JavaScript",
                    "Java",
                    "C",
                    "Shell"
                  ]
            
    repos_list = []

    languages.each { |lang|
      # get the list of all repositories from filtered language
      url = 'https://api.github.com/search/repositories?q=language:'+lang+'&s=stars&type=Repositories&page=1&per_page=10'
      uri = URI(url)
      puts url
      response = Net::HTTP.get(uri)
      repos_list << JSON.parse(response)
    }
    
    repos_list.each { |repo|      
      repo['items'].each{ |item|
        repository = Repository.create(
          full_name: item['full_name'],
          description: item['description'],
          stargazers_count: item['stargazers_count'],
          language: item['language'],
          url: item['url'],
          size: item['size'],
          login: item['owner']['login']
        )
      }
    }
    redirect_to root_path
  end
end