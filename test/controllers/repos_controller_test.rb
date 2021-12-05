require "test_helper"

class ReposControllerTest < ActionDispatch::IntegrationTest

  def response_repository_body_success
    {
      "total_count": 2588202,
      "incomplete_results": false,
      "items": [
        {
          "id": 8514,
          "name": "rails",
          "full_name": "rails/rails",
          "owner": {
            "avatar_url": "https://avatars.githubusercontent.com/u/4223?v=4"
          },
          "html_url": "https://github.com/rails/rails",
          "description": "Ruby on Rails",
          "created_at": "2008-04-11T02:19:47Z",
          "updated_at": "2021-12-05T00:36:07Z",
          "homepage": "https://rubyonrails.org",
          "stargazers_count": 49511,
          "language": "Ruby",
        }
      ]
    }
  end

  test 'Should show Most Popular Github Repositories as title when access root' do
    get root_path
    assert_response :success
    assert_select 'h1', text: 'Repositórios mais populares do Github'
  end

  test 'Should show Most Popular Github Repositories as title when access specific url' do
    get repos_path
    assert_response :success
    assert_select 'h1', text: 'Repositórios mais populares do Github'
  end

  test 'User should have a search button on repos index' do
    get repos_path
    assert_response :success
    assert_select 'a', text: 'Explorar repositórios'
  end

  test 'Should list name, language, description and show button in repository card' do
    get root_path
    assert_response :success

    assert_select 'div' do
      assert_select 'h5', text: 'rails/rails'
      assert_select 'p',  text: 'Ruby'
      assert_select 'p',  text: 'Ruby on Rails'
      assert_select 'a',  text: 'Ver detalhes'
    end
  end

  test 'Should create new repositorie by clicking the button' do
    stub_request(:get, 'https://api.github.com/search/repositories?q=language:ruby&sort=stars&order=desc&per_page=1').
    to_return(
      status: 200,
      body: response_repository_body_success.to_json,
      headers: {}
    )

    assert_difference 'Repo.count', 1 do
      ReposController.create('ruby')
    end
  end
end
