class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.string :name
      t.string :owner
      t.string :html_url
      t.text :description
      t.datetime :create_date
      t.datetime :update_date
      t.integer :stargazers_count
      t.integer :forks_count
      t.integer :open_issues_count

      t.timestamps
    end
  end
end
