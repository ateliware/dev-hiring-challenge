class CreateRepos < ActiveRecord::Migration[6.1]
  def change
    create_table :repos do |t|
      t.string :github_id
      t.string :full_name
      t.string :html_url
      t.string :description
      t.string :homepage
      t.string :language
      t.string :stargazers_count

      t.timestamps
    end
  end
end
