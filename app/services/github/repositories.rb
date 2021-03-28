module Github
  class Repositories < Base
    def initialize(args)
      @language_id = args[:language]
      @page = args[:page]
    end

    def call
      return false unless language_id.present? && response.success?

      OpenStruct.new({
        total_count: response["total_count"],
        repositories: repositories,
      })
    end

    private

    attr_reader :language_id, :page

    def language
      @language ||= Language.find(language_id)
    end

    def response
      @response ||= HTTParty.get(url, query: search_query, headers: headers)
    end

    def repositories
      response["items"].map do |repository|
        repository.slice(*repository_keys)

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
        q: "language:Assembly",
        sort: "stars",
        order: "desc",
        per_page: 10,
      }

      query[:q] = "language:#{language.name}" if language.present?
      query.merge(page: page) if page.present?

      query
    end
  end
end
