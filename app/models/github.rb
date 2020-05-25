class Github
  include HTTParty
  base_uri 'api.github.com'

  def initialize(github_token = ENV['GITHUB_TOKEN'])
    @auth = { headers: { 'Authorization' => "token #{github_token}" } }
  end

  def repositories(id)
    self.class.get("/repositories/#{id}", @auth)
  end

  def search_repositories(query_string)
    self.class.get("/search/repositories?q=#{query_string}", @auth)
  end
end
