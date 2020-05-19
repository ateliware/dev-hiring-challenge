class Github
  include HTTParty
  base_uri 'api.github.com'

  def user
    res = self.class.get('/user', { headers: { "Authorization" => "token #{ENV['GITHUB_TOKEN']}" } })
  end
end
