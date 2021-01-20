# frozen_string_literal: true

module Github
  class SearchRepositories < Base
    class << self
      def call(per_page = 50, page = 1)
        query_params = "?q=#{default_languages}&page=#{page}&per_page=#{per_page}"
        get("/search/repositories#{query_params}", default_headers)
      end
    end
  end
end
