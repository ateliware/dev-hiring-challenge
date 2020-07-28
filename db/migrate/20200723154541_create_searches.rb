class CreateSearches < ActiveRecord::Migration[6.0]
  def change
    create_table :searches do |t|
      t.string :name
      t.string :description
      t.string :language
      t.integer :stargazers_count
      t.integer :forks

      t.timestamps
    end
  end
end
