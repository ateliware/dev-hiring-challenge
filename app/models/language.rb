class Language < ApplicationRecord
    has_many :repositories

    def fetch_repositories
        client = Octokit::Client.new(:access_token => '486e268856e493809aecdb482e7a7b9eb67d4158')
        
        repositories = client.search_repositories "language:#{self.code}", {
            sort: 'stars',
            order: 'desc',
            page: 1,
            per_page: 5
          }
    
        repositories.to_h[:items].map do |item|
            {
                name:              item[:name],
                owner_name:        item[:owner][:login],
                owner_avatar_url:  item[:owner][:avatar_url],
                html_url:          item[:html_url],
                description:       item[:description],
                github_create:     item[:created_at],
                github_update:     item[:updated_at],
                stargazers_count:  item[:stargazers_count],
                forks_count:       item[:forks_count],
                open_issues_count: item[:open_issues_count],
                watchers_count:    item[:watchers_count]
            }
        end
    end
end
