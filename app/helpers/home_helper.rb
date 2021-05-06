# frozen_string_literal: true

# Module for consume api of github in the home page
module HomeHelper
  require 'rest_client'
  #LANGS = %w[ruby java elixir python javascript].freeze
  URL = 'https://api.github.com/search/repositories'

  # ?q=ruby&s=&per_page=5
  def self.load_and_persist_repo(langs)
    langs.each do |lang|
      json = send_request("#{URL}?q=#{lang}+language:#{lang}&s=&per_page=5")
      persist_repo(json)
    end
  end

  def self.send_request(url)
    resp = RestClient.get url
    JSON.parse(resp.body)['items']
  end

  def self.persist_repo(json)
    json.each do |item|
      rep = Repository.create(repo: item)
      # adicionar tratamento
      rep.save
    end
  end

  def self.convert_param_to_language(param)
    languages = YAML.load(File.read('./db/languages.yml'))
    languages.each { |(key, value)| return value if key.to_s == param.to_s }
  end
end
