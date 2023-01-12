require "application_system_test_case"

class RepositoriesTest < ApplicationSystemTestCase
  setup do
    @repository = repositories(:one)
  end

  test "visiting the index" do
    visit repositories_url
    assert_selector "h1", text: "Repositories"
  end

  test "should create repository" do
    visit repositories_url
    click_on "New repository"

    fill_in "Forks", with: @repository.forks
    fill_in "Full name", with: @repository.full_name
    fill_in "Github", with: @repository.github_id
    fill_in "Language", with: @repository.language_id
    fill_in "License", with: @repository.license
    fill_in "Name", with: @repository.name
    fill_in "Node", with: @repository.node_id
    fill_in "Open issues", with: @repository.open_issues
    fill_in "Origin created at", with: @repository.origin_created_at
    fill_in "Origin updated", with: @repository.origin_updated
    fill_in "Stars", with: @repository.stars
    fill_in "Topics", with: @repository.topics
    fill_in "Url", with: @repository.url
    click_on "Create Repository"

    assert_text "Repository was successfully created"
    click_on "Back"
  end

  test "should update Repository" do
    visit repository_url(@repository)
    click_on "Edit this repository", match: :first

    fill_in "Forks", with: @repository.forks
    fill_in "Full name", with: @repository.full_name
    fill_in "Github", with: @repository.github_id
    fill_in "Language", with: @repository.language_id
    fill_in "License", with: @repository.license
    fill_in "Name", with: @repository.name
    fill_in "Node", with: @repository.node_id
    fill_in "Open issues", with: @repository.open_issues
    fill_in "Origin created at", with: @repository.origin_created_at
    fill_in "Origin updated", with: @repository.origin_updated
    fill_in "Stars", with: @repository.stars
    fill_in "Topics", with: @repository.topics
    fill_in "Url", with: @repository.url
    click_on "Update Repository"

    assert_text "Repository was successfully updated"
    click_on "Back"
  end

  test "should destroy Repository" do
    visit repository_url(@repository)
    click_on "Destroy this repository", match: :first

    assert_text "Repository was successfully destroyed"
  end
end
