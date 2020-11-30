require 'test_helper'

class RepositoryControllerTest < ActionDispatch::IntegrationTest
  test "saving repository without parameters" do
	repository = Repository.new
	repository.save, "saved repository without any parameters"
  end
  
  test "should get repository index" do
    get repository.json
    assert_response :success
  end
end