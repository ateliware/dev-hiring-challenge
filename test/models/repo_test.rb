require "test_helper"

class RepoTest < ActiveSupport::TestCase
  test 'Repo should be valid' do
    assert Repo.new(
      github_id: '12345',
      full_name: 'repo/test',
      html_url: 'http://www.test.com',
      description: 'Repo test description',
      stargazers_count: '10000',
      homepage: 'http://homepage.com',
      language: 'Ruby',
      avatar_url: 'http://avatar-ruby-test.com'
    ).valid?
  end
end
