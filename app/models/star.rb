class Star < ApplicationRecord
  LANGUAGES = %i[ruby java python scala ocaml]
  STARS_PER_LANGUAGE = 5

  def self.fetch_all_from_github_or_database
    return all if any?

    create_from_resources_collection(from_github)
    
    all
  end

  def self.create_from_resources_collection(stars)
    stars_attributes = stars.map do |star|
      {
        name: star.full_name,
        github_url: star.html_url,
        description: star.description,
        homepage_url: star.homepage,
        language: star.language,
        stars_count: star.stargazers_count,
        created_at: Time.current,
        updated_at: Time.current
      }
    end

    Star.insert_all(stars_attributes)
  end

  def self.from_github
    client = Octokit::Client.new
    stars = LANGUAGES.map do |language|
      results = client.search_repositories(
        "language:#{language}",
        sort: 'stars',
        order: 'desc',
        per_page: STARS_PER_LANGUAGE
      )

      results.items
    end

    stars.flatten
  end
end
