class RepositoriesSearch
  include ActiveModel::Model

  attr_accessor :language

  validates :language, presence: true

  def save
    return false unless valid?
    save_repositories!

    true
  end

  def save!
    raise errors.full_messages.join unless save
  end

  def request
    @request ||= RestClient.get("#{api_url}q=language:#{language}&sort=stars&order=desc&page=1&per_page=9", headers = {Authorization: "token #{Rails.application.credentials[:github_token]}"})
  end

  def repositories
    @repositories ||= JSON.parse(request.body)["items"]
  end

  def save_repositories!
    repositories.each do |repository|
      rep = Repository.find_or_initialize_by(
          github_id: repository["id"],
      )
      rep.update(
          name: repository["name"],
          description: repository["description"],
          creation_date: repository["created_at"],
          language: repository["language"],
          forks_count: repository["forks_count"],
          stargazers_count: repository["stargazers_count"],
          open_issues_count: repository["open_issues_count"],
          github_url: repository["html_url"],
          owner_attributes: {
              github_login: repository["owner"]["login"],
              avatar_url: repository["owner"]["avatar_url"],
              github_url: repository["owner"]["html_url"],
          },
      )
    end
  end

  private

  def api_url
    @api_url ||= 'https://api.github.com/search/repositories?'
  end
end
