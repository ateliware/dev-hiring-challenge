class Repository < ApplicationRecord
  belongs_to :language

  validates :name,
            :owner_name, 
            :owner_avatar_url,
            :html_url,
            :description,
            :github_create,
            :github_update,
            :stargazers_count,
            :forks_count,
            :open_issues_count,
            :watchers_count,
            presence: true
end
