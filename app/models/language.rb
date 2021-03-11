class Language < ApplicationRecord
  has_many :repositories, dependent: :destroy
  validates_uniqueness_of :name

  # Fetches the five most popular repositories for this programming language
  # using Github's API, through Octokit gem
  def fetch_repositories
    client = Octokit::Client.new(:access_token => ENV["GITHUB_ACCESS_TOKEN"])

    result = client.search_repositories "language:#{code}", {
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 5
    }

    answer = []

    result.to_h[:items].each do |item|
      answer << {
        name:              item[:name],
        owner:             item[:owner][:login],
        html_url:          item[:html_url],
        description:       item[:description],
        create_date:       item[:created_at],
        update_date:       item[:updated_at],
        stargazers_count:  item[:stargazers_count],
        forks_count:       item[:forks_count],
        open_issues_count: item[:open_issues_count]
      }
    end

    return answer
  end
end
