class CreateRepositories < ActiveRecord::Migration[5.2]
  def change
    create_table :repositories do |t|
      t.string :name, null: false
      t.string :owner_avatar
      t.string :description
      t.string :html_url
      t.string :home_page
      t.integer :stargazers_count, default: 0
      t.references :language, foreign_key: true

      t.timestamps
    end
  end
end
