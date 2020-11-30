require 'test_helper'

class BrowsegithubControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_path
    assert_response :success
    assert_select "title", "DevHiringChallenge"
  end
end
