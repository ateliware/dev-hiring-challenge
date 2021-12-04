require "test_helper"

class ReposControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get repos_index_url
    assert_response :success
  end
end
