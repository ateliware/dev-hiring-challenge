class CreateRepositories < ActiveRecord::Migration[7.0]
  def change
    create_table :repositories do |t|
      t.string :name
      t.text :description
      t.string :node_id
      t.integer :github_id
      t.string :full_name
      t.integer :stars
      t.string :url
      t.integer :forks
      t.integer :open_issues
      t.string :license
      t.datetime :origin_created_at
      t.string :origin_updated_at
      t.string :topics, array: true, default: []
      t.references :language, null: false, foreign_key: true

      t.timestamps
    end
  end
end
