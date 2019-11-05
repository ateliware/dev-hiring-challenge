class AddInfosToRepos < ActiveRecord::Migration[5.2]
  def change
    add_column :repos, :stargazers_count, :integer
    add_column :repos, :watchers_count, :integer
    add_column :repos, :forks_count, :integer
    add_column :repos, :open_issues_count, :integer
    add_column :repos, :subscribers_count, :integer
    add_column :repos, :owner_avatar_url, :string
    add_column :repos, :owner_html_url, :string
    add_column :repos, :readme_content, :text
  end
end
