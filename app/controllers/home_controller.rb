class HomeController < ApplicationController
  before_action :set_global_variable_task

  require 'rest-client'
  

  def index
  end

  def ruby
    response = RestClient.get('https://api.github.com/search/repositories?q=rubyin:name')
    @ruby = JSON.parse(response.body)
  end

  def python
    response = RestClient.get('https://api.github.com/search/repositories?q=pythonin:name')
    @python = JSON.parse(response.body)
  end

  def elixir
    response = RestClient.get('https://api.github.com/search/repositories?q=elixirin:name')
    @elixir = JSON.parse(response.body)
  end

  def nodejs
    response = RestClient.get('https://api.github.com/search/repositories?q=nodejsin:name')
    @nodejs = JSON.parse(response.body)
  end

  def aspnet
    response = RestClient.get('https://api.github.com/search/repositories?q=aspnetin:name')
    @aspnet = JSON.parse(response.body)
  end

  

  def set_global_variable_task
    @variable_task = GlobalVariable.new
  end
  
end