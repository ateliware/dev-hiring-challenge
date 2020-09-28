json.extract! repository, :id, :uid, :name, :avatar_url, :watchers_count, :description, :url, :created_at, :updated_at
json.url repository_url(repository, format: :json)
