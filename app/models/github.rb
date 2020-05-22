class Github
  include HTTParty
  base_uri 'api.github.com'

  def initialize
    @auth = { headers: { "Authorization" => "token #{ENV['GITHUB_TOKEN']}" } }
  end

  def user
    res = self.class.get('/user', @auth)
  end

  def search_repositories
    res = self.class.get('/search/repositories?q=language:ruby+language:javascript+language:swift+language:elixir+language:c', @auth)
  end

  def repositories(id)
    res = self.class.get("/repositories/#{id}", @auth)
  end
end
