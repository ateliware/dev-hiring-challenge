class CreateRepos < ActiveRecord::Migration[5.2]
  def change
    create_table :repos do |t|
      t.integer :gh_id
      t.string :gh_node_id
      t.string :name
      t.string :full_name
      t.string :html_url
      t.text :description
      t.string :language
      t.string :homepage
      t.datetime :repo_created_at

      t.timestamps
    end
    add_index :repos, :gh_id, unique: true
  end
end
