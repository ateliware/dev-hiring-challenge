class LanguagesController < ApplicationController
  require 'json'
  require 'open-uri'

  def index
    @languages = Language.all
  end

  def show
    @language = Language.find(params[:id])
  end

  def fetch_data
    Language.delete_all
    search_urls = Introduction.pluck(:name).map do |name|
      opened_link = URI.parse("https://api.github.com/search/repositories?q=#{name}&per_page=1").read
      sleep 1
      saved_json = JSON.parse(opened_link)
      saved_json['items'].empty? ? name : saved_json
    end

    search_urls.each do |json_file|
      language = Language.new
      language.hash_response = json_file['items'] ? json_file['items'].first : {}
      language.name = language.hash_response['language'] || json_file
      language.save
    end

    Introduction.where.not(name: %w[ruby javascript python elixir java]).delete_all

    redirect_to languages_path
  end
end