class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.integer :uid
      t.string :name
      t.string :avatar_url
      t.integer :watchers_count
      t.text :description
      t.string :url

      t.timestamps
    end
  end
end
