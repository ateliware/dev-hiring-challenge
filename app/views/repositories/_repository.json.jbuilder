json.extract! repository, :id, :name, :node_id, :github_id, :full_name, :stars, :url, :forks, :open_issues, :license, :origin_created_at, :origin_updated, :topics, :language_id, :created_at, :updated_at
json.url repository_url(repository, format: :json)
