require "test_helper"

class RepositoryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get repository_index_url
    assert_response :success
  end
end
