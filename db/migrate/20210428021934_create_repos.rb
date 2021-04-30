class CreateRepos < ActiveRecord::Migration[6.1]
  def change
    create_table :repos do |t|
      t.integer :_id, null: false
      t.string :node_id, null: false
      t.string :name, null: false
      t.string :full_name, null: false
      t.boolean :private, null: false
      t.string :html_url, null: false
      t.text :description, null: false
      t.boolean :fork, null: false
      t.string :url, null: false
      t.date :pushed_at, null: false
      t.string :homepage, null: false
      t.integer :size, null: false
      t.integer :stargazers_count, null: false
      t.integer :watchers_count, null: false
      t.string :language, null: false
      t.integer :forks_count, null: false
      t.integer :open_issues_count, null: false

      t.timestamps
    end
  end
end
