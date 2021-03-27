class CreateLanguages < ActiveRecord::Migration[6.1]
  def change
    create_table :languages do |t|
      t.string :name
      t.text :hash_response

      t.timestamps
    end
  end
end
