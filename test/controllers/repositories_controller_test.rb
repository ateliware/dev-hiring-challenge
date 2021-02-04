require 'test_helper'
require 'helpers/authentication_helper'

class RepositoriesControllerTest < ActionDispatch::IntegrationTest
  include AuthorizationHelper

  test 'should get index' do
    @user = User.first
    @auth_tokens = auth_tokens_for_user(@user)
    get '/repositories',
        headers: @auth_tokens

    assert_response :success
  end

  test 'should search a repository by name' do
    get '/repositories',
        params: {
          name: 'Tetris'
        },
        headers: @auth_tokens
    assert_response :success
  end
  test 'should search a repository by language' do
    get '/repositories',
        params: {
          language: 'Tetris'
        },
        headers: @auth_tokens
    assert_response :success
  end
  test 'should delete a repository' do
    delete '/repositories',
           params: {
             language: 'Tetris'
           },
           headers: @auth_tokens
    assert_response :success
  end
  test 'should search repositories from Github API' do
    get '/repositories_api_search'
    assert_response :success
  end
end
