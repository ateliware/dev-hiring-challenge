class Repository < ApplicationRecord

    validates :name, presence: true
    validates :full_name, presence: true
    validates :html_url, presence: true
    validates :description, presence: true
    validates :language, presence: true
    validates :stargazers_count, presence: true
    validates :forks, presence: true
    validates :open_issues, presence: true
    validates :watchers, presence: true
    validates :owner_login, presence: true
    validates :owner_avatar_url, presence: true
end
