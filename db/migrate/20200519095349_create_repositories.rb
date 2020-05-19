class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.bigint :github_id
      t.string :name
      t.text :description
      t.datetime :creation_date
      t.string :language
      t.integer :forks_count
      t.integer :stargazers_count
      t.integer :open_issues_count

      t.timestamps
    end
  end
end
