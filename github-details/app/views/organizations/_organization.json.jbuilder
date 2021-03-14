json.extract! organization, :id, :slug, :created_at, :updated_at, :name, :description, :avatar_url
json.url organization_url(organization, format: :json)
