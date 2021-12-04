class Repo < ApplicationRecord

  END_POINT = 'https://api.github.com/search'

  def self.search_repo(language)
    uri = URI("#{END_POINT}/repositories?q=language:#{language}&sort=stars&order=desc&per_page=1")

    ActiveSupport::JSON.decode(
      Net::HTTP.get(uri)
    )
  end
end
