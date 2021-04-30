json.extract! repo, :id, :_id, :node_id, :name, :full_name, :private, :html_url, :description, :fork, :url, :pushed_at, :homepage, :size, :stargazers_count, :watchers_count, :language, :forks_count, :open_issues_count, :created_at, :updated_at
json.url repo_url(repo, format: :json)
