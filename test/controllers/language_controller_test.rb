require "test_helper"

class LanguageControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get language_index_url
    assert_response :success
  end
end
