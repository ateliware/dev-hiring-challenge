class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.belongs_to :user, foreign_key: true
      t.string :name
      t.string :html_url
      t.text :description
      t.string :owner
      t.string :language

      t.timestamps
    end
  end
end
