module Github
  class RepoCreator
    END_POINT = 'https://api.github.com/search'

    def self.search_repo(language)
      uri = URI("#{END_POINT}/repositories?q=language:#{language}&sort=stars&order=desc&per_page=1")

      found_repo = ActiveSupport::JSON.decode(
        Net::HTTP.get(uri)
      )

      found_repo["items"].first
    end
  end
end