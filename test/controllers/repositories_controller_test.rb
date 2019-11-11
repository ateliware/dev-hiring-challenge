require 'test_helper'

class RepositoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @repository = repositories(:one)
  end

  test "should get index" do
    get repositories_url
    assert_response :success
  end

  test "should get new" do
    get new_repository_url
    assert_response :success
  end

  test "should create repository" do
    assert_difference('Repository.count') do
      post repositories_url, params: { repository: { external_id: @repository.external_id, name: @repository.name, owner_name: @repository.owner_name } }
    end

    assert_redirected_to repository_url(Repository.last)
  end

  test "should show repository" do
    get repository_url(@repository)
    assert_response :success
  end

  test "should get edit" do
    get edit_repository_url(@repository)
    assert_response :success
  end

  test "should update repository" do
    patch repository_url(@repository), params: { repository: { external_id: @repository.external_id, name: @repository.name, owner_name: @repository.owner_name } }
    assert_redirected_to repository_url(@repository)
  end

  test "should destroy repository" do
    assert_difference('Repository.count', -1) do
      delete repository_url(@repository)
    end

    assert_redirected_to repositories_url
  end
end
