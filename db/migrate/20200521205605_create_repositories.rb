class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories, :id => false do |t|
      t.integer :id
      t.string  :node_id
      t.string  :name
      t.string  :full_name
      t.string  :description
      t.integer :stargazers_count
      t.integer :watchers_count
      t.string  :language
      t.integer :forks_count
      t.integer :open_issues_count
    end
  end
end
