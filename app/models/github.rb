class Github
  include HTTParty
  base_uri 'api.github.com'

  def initialize
    @auth = { headers: { "Authorization" => "token #{ENV['GITHUB_TOKEN']}" } }
  end

  def user
    res = self.class.get('/user', @auth)
  end

  def repositories
    res = self.class.get('/search/repositories?q=language:ruby', @auth)
  end
end
