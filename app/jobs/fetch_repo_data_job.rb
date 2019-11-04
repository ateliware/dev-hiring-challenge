class FetchRepoDataJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    github_access_token = Rails.configuration.x.github_auth_token
    languages_list = Rails.configuration.x.languages
    client = Octokit::Client.new(access_token: github_access_token,
                                 per_page: 100)
    languages_list.each do |language|
      puts "Fetching #{language} repositories..."
      repos = client.search_repos("language:#{language}").items
      puts 'Saving fetched data...'
      repos.each do |repo|
        # TODO: Save the record into the database.
      end
    end
    puts 'Done.'
  end
end
