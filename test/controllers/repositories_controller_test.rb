require "test_helper"

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
    assert_difference("Repository.count") do
      post repositories_url, params: { repository: { forks: @repository.forks, full_name: @repository.full_name, github_id: @repository.github_id, language_id: @repository.language_id, license: @repository.license, name: @repository.name, node_id: @repository.node_id, open_issues: @repository.open_issues, origin_created_at: @repository.origin_created_at, origin_updated: @repository.origin_updated, stars: @repository.stars, topics: @repository.topics, url: @repository.url } }
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
    patch repository_url(@repository), params: { repository: { forks: @repository.forks, full_name: @repository.full_name, github_id: @repository.github_id, language_id: @repository.language_id, license: @repository.license, name: @repository.name, node_id: @repository.node_id, open_issues: @repository.open_issues, origin_created_at: @repository.origin_created_at, origin_updated: @repository.origin_updated, stars: @repository.stars, topics: @repository.topics, url: @repository.url } }
    assert_redirected_to repository_url(@repository)
  end

  test "should destroy repository" do
    assert_difference("Repository.count", -1) do
      delete repository_url(@repository)
    end

    assert_redirected_to repositories_url
  end
end
