class LanguagesController < ApplicationController
  require 'json'
  require 'open-uri'
  require 'octokit'

  def index
    @languages = Language.all
  end

  def show
    @language = Language.find(params[:id])
  end

  def fetch_data
    Language.delete_all
    client = Octokit::Client.new(access_token: ENV['GITHUB_KEY'])
    fetched_hashes = Introduction.pluck(:name).map do |name|
      ### Linhas comentadas abaixo são para a resolução com outro método, sem a utilização do Octokit
      # opened_link = URI.parse("https://api.github.com/search/repositories?q=#{name}&per_page=1").read
      # saved_json = JSON.parse(opened_link)
      # saved_json['items'].empty? ? name : saved_json
      begin
        return_hash = client.search_repositories("language:#{name}", { sort: 'stars', order: 'desc', page: 1, per_page: 1 })
      rescue Octokit::UnprocessableEntity
        return_hash = {}
      end
      return_hash.empty? || return_hash.items.empty? ? name : return_hash
    end

    fetched_hashes.each do |fetched_hash|
      language = Language.new
      ### Linhas comentadas abaixo são para a resolução com outro método, sem a utilização do Octokit
      # language.hash_response = json_file['items'] ? json_file['items'].first : {}
      # language.name = language.hash_response['language'] || json_file
      language.hash_response = fetched_hash.is_a?(String) ? {} : fetched_hash.items.first.to_hash
      language.name = language.hash_response[:language] || fetched_hash
      language.save
    end

    Introduction.where.not(name: %w[ruby javascript python elixir java]).delete_all

    redirect_to languages_path
  end
end