module Github
  require 'rest-client'
  class Api
    attr_accessor :response
    URL = Figaro.env.api_url

    def initialize(options)
      langs = ['Ruby', 'Elixir', 'Python', 'Go', 'Javascript']
      @languages = langs.map { |lang| "language:#{lang}" }
      @options = options
      @response = nil
    end

    def get_repositories
      @response = { "repositorios": {} }
      arr = []
      @languages.each do |language_query|
        JSON.parse(RestClient.get(URL, params: {q: language_query, sort: 'start', order: 'desc'}))["items"].map { |item| arr << item }
      end
      @response["repositorios"] = arr
    end

    def save_repositories
      return false unless @response
    end
  end
end