require "application_system_test_case"

class RepositoriesTest < ApplicationSystemTestCase
  setup do
    @repository = repositories(:one)
  end

  test "visiting the index" do
    visit repositories_url
    assert_selector "h1", text: "Repositories"
  end

  test "creating a Repository" do
    visit repositories_url
    click_on "New Repository"

    fill_in "Create date", with: @repository.create_date
    fill_in "Description", with: @repository.description
    fill_in "Forks count", with: @repository.forks_count
    fill_in "Html url", with: @repository.html_url
    fill_in "Name", with: @repository.name
    fill_in "Open issues count", with: @repository.open_issues_count
    fill_in "Owner", with: @repository.owner
    fill_in "Stargazers count", with: @repository.stargazers_count
    fill_in "Update date", with: @repository.update_date
    click_on "Create Repository"

    assert_text "Repository was successfully created"
    click_on "Back"
  end

  test "updating a Repository" do
    visit repositories_url
    click_on "Edit", match: :first

    fill_in "Create date", with: @repository.create_date
    fill_in "Description", with: @repository.description
    fill_in "Forks count", with: @repository.forks_count
    fill_in "Html url", with: @repository.html_url
    fill_in "Name", with: @repository.name
    fill_in "Open issues count", with: @repository.open_issues_count
    fill_in "Owner", with: @repository.owner
    fill_in "Stargazers count", with: @repository.stargazers_count
    fill_in "Update date", with: @repository.update_date
    click_on "Update Repository"

    assert_text "Repository was successfully updated"
    click_on "Back"
  end

  test "destroying a Repository" do
    visit repositories_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Repository was successfully destroyed"
  end
end
