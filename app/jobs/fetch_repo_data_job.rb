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
        Repo.find_or_initialize_by(gh_id: repo[:id]).update(
          gh_node_id: repo[:node_id],
          name: repo[:name],
          full_name: repo[:full_name],
          html_url: repo[:html_url],
          description: repo[:description],
          language: repo[:language],
          homepage: repo[:homepage],
          repo_created_at: repo[:created_at]
        )
      end
    end
    puts 'Done.'
  end
end
