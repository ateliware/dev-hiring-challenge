class CreateLanguages < ActiveRecord::Migration[5.2]
  def change
    create_table :languages do |t|
      t.string :name, null: false
      t.string :slug, null: false

      t.timestamps

      t.index :slug
    end
  end
end
