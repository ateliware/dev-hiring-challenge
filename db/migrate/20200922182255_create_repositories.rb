class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.string :name
      t.string :full_name
      t.string :html_url
      t.string :description
      t.string :language
      t.string :stargazers_count
      t.string :forks
      t.string :open_issues
      t.string :watchers
      t.string :owner_login
      t.string :owner_avatar_url
      
      t.timestamps
    end
  end
end
