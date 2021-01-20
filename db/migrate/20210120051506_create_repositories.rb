class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.integer :github_repo_id, null: false
      t.string :name, null: false
      t.string :full_name, null: false
      t.string :html_url, null: false
      t.string :language, null: false
      t.text :description
      t.integer :stargazers_count, default: 0
      t.integer :watchers_count, default: 0
      t.integer :forks_count, default: 0
      t.integer :open_issues_count, default: 0
      t.integer :score, default: 0
      t.timestamps

      t.index [:github_repo_id]
      t.index [:language]
    end
  end
end
