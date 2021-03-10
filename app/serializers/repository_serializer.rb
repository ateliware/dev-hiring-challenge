class RepositorySerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :owner,
    :html_url,
    :description,
    :create_date,
    :update_date,
    :stargazers_count,
    :forks_count,
    :open_issues_count,
    :language

  def language
    self.object.language.name
  end
end
