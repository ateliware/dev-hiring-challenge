class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.text :name
      t.text :owner_name
      t.text :owner_avatar_url
      t.text :description
      t.text :url
      t.integer :stargazers_count
      t.integer :forks_count
      t.integer :open_issues_count
      t.integer :watchers_count
      t.datetime :github_create
      t.datetime :github_update
      t.references :language, null: false, foreign_key: true

      t.timestamps
    end
  end
end
