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
          repo_created_at: repo[:created_at],
          stargazers_count: repo[:stargazers_count],
          watchers_count: repo[:watchers_count],
          forks_count: repo[:forks_count],
          open_issues_count: repo[:open_issues_count],
          subscribers_count: repo[:subscribers_count],
          owner_avatar_url: repo[:owner].avatar_url,
          owner_html_url: repo[:owner].html_url
        )
      end
    end
    puts 'Done.'
  end
end
