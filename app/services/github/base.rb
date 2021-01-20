# frozen_string_literal: true

module Github
  DEFAULT_LANGUAGES = %w[ruby php elixir python go]

  class Base
    include HTTParty
    base_uri 'https://api.github.com'

    class << self
      def default_languages
        DEFAULT_LANGUAGES.map.with_index do |language, index|
          plus = index == 0 ? nil : '+'
          [plus, 'language:', language].compact
        end.join
      end

      protected

      def default_headers
        @default_headers ||= {
          basic_auth: { username: ENV['GITHUB_USERNAME'], password: ENV['GITHUB_API_TOKEN'] }
        }
      end
    end
  end
end
