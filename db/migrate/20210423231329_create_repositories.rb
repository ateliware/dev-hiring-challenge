class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories,  id: false do |t|
      t.integer :id, null: false
      t.string :node_id, null: false
      t.string :name, null: false
      t.string :full_name
      t.boolean :private
      t.json :owner
      t.string :html_url, null: false
      t.string :description
      t.date :created_at
      t.date :updated_at
      t.date :pushed_at
      t.string :git_url
      t.string :ssh_url
      t.string :clone_url
      t.string :svn_url
      t.string :homepage
      t.integer :size
      t.string :language
      t.integer :forks
      t.json :license
      t.integer :watchers
      t.integer :stargazers_count
      t.datetime :fetch_at, null: false, default: Time.zone.now
    end
  end
end
