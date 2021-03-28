class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.string :external_id, null: false
      t.string :full_name, null: false
      t.string :description
      t.references :language, index: true
      t.string :url, null: false
      t.timestamps
    end
  end
end
