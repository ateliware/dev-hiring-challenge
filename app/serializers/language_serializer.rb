class LanguageSerializer < ActiveModel::Serializer
  attributes :id, :repositories

  def repositories
    self.object.repositories.order(stargazers_count: :desc).map do |repo|
      {
        id:              repo.id,
        name:            repo.name,
        owner:           repo.owner,
        stargazersCount: repo.stargazers_count,
        forksCount:      repo.forks_count
      }
    end
  end
end
