json.extract! repository, :id, :name, :owner_avatar, :description, :html_url, :home_page, :stargazers_count, :language_id, :created_at, :updated_at
json.url repository_url(repository, format: :json)
