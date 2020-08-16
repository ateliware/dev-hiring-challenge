class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.string :html_url
      t.string :description
      t.integer :stargazers_count
      t.string :language
      t.integer :watchers_count
      t.integer :forks

      t.timestamps
    end
  end
end
