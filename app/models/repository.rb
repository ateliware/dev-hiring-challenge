class Repository < ApplicationRecord
  belongs_to :language
  validates :name, :full_name, :github_id, :node_id, :stars, :url, :forks, :open_issues, :origin_created_at, :origin_updated_at, presence: true
end
