class LanguagesController < ApplicationController
  require 'json'
  require 'open-uri'

  def index
    url = "https://api.github.com/search/repositories?q=language:#{language}&sort=best_match&order=desc&per_page=3&page=1"
    user_serialized = open(url).read
    @user = JSON.parse(user_serialized)
  end

  def show
  end

  def destroy
  end
end