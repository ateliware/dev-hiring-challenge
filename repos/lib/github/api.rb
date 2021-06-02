module Github
  require 'rest-client'
  class Api
    attr_accessor :response
    URL = Figaro.env.api_url

    def initialize(options)
      langs = ['Ruby']
      @languages = langs.map { |lang| "language: #{lang}+" }.join('')
      @options = options
      @response = nil
    end

    def get_repositories
      @response = JSON.parse(RestClient.get(URL, params: {q: @languages}))
    end

    def save_repositories
      return false unless @response
    end
  end
end