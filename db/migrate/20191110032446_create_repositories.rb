class CreateRepositories < ActiveRecord::Migration[5.2]
  def change
    create_table :repositories do |t|
      t.integer :external_id
      t.string :name
      t.string :owner_name
      t.timestamps
    end
  end
end