require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'create session' do
    post '/login',
         params: {
           email: 'HarryPotter',
           password: 'http://test.com'
         },
         headers: @auth_tokens

    assert_response :success
  end
end
