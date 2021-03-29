# frozen_string_literal: true

module Github
  class Repositories < Base
    def initialize(args)
      super()
      @language = args[:language] if args.present?
      @page = args[:page] if args.present?
    end

    def call
      return false unless language.present? && response.success?

      OpenStruct.new({
                       total_count: response["total_count"],
                       repositories: repositories
                     })
    end

    private

    attr_reader :language, :page

    def response
      @response ||= HTTParty.get(url, query: search_query, headers: headers)
    end

    def repositories
      response["items"].map do |repository|
        repository = repository.slice(*repository_keys)

        repository["external_id"] = repository.delete("id")
        repository["url"] = repository.delete("html_url")

        repository
      end
    end

    def repository_keys
      %w[id full_name html_url description stargazers_count language]
    end

    def url
      "#{base_url}/search/repositories"
    end

    def headers
      {
        accept: "application/vnd.github.v3+json"
      }
    end

    def search_query
      query = {
        sort: "stars",
        order: "desc",
        per_page: 10
      }

      query[:q] = "language:#{language}" if language.present?
      query.merge(page: page) if page.present?

      query
    end
  end
end
