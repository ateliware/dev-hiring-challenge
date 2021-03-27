class LanguagesController < ApplicationController
  require 'json'
  require 'open-uri'

  def index
    @languages = Language.all
  end

  def show
    @language = Language.find(params[:id])
  end

  def destroy
  end

  def new
  end

  def fetch_data
    Language.delete_all
    # search_urls = Introduction.all.map { |introduction| "https://api.github.com/search/repositories?q=#{introduction.name}&per_page=1" }
    search_urls = Introduction.pluck(:name).map { |name| "https://api.github.com/search/repositories?q=#{name}&per_page=1" }
    search_urls.each do |search_url|
      json_file = JSON.parse(open(search_url).read)
      pl = Language.new
      pl.hash_response = json_file['items'].first
      pl.name = pl.hash_response['language']
      pl.save
    end

    # main_languages = %w[ruby javascript python elixir java]
    # deletable_languages = Introduction.all.reject do |introduction|
    #   main_languages.include?(introduction.name)
    # end
    Introduction.where.not(name: %w[ruby javascript python elixir java]).delete_all
    # deletable_languages.each do |language|
    #   language.delete
    # end

    redirect_to languages_path
  end
end