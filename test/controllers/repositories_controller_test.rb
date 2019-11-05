require 'test_helper'

class RepositoriesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  setup do 
    @repo = repos(:one)
  end

  test 'should get index' do
    get repositories_url
    assert_response :success
  end

  test 'should fetch repositories data' do
    get fetch_data_repositories_url
    assert_redirected_to root_url
  end

  test 'should clear repositories data' do
    get clear_data_repositories_url
    assert_redirected_to root_url
  end
end
