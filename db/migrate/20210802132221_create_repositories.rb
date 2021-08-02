class CreateRepositories < ActiveRecord::Migration[5.2]
  def change
    create_table :repositories do |t|
      t.string :full_name
      t.string :description
      t.integer :stargazers_count
      t.string :language
      t.string :url
      t.integer :size
      t.string :login

      t.timestamps
    end
  end
end
