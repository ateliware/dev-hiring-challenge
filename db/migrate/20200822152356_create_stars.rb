class CreateStars < ActiveRecord::Migration[6.0]
  def change
    create_table :stars do |t|
      t.string :name
      t.string :github_url
      t.string :description
      t.string :homepage_url
      t.string :language
      t.integer :stars_count
      t.timestamps
    end
  end
end
