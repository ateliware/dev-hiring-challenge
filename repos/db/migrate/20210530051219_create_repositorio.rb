class CreateRepositorio < ActiveRecord::Migration[6.0]
  def change
    create_table :repositorios do |t|
      t.string :name
      t.string :full_name
      t.boolean :private
      t.string :language
      t.string :description
      t.references :owner, foreign_key: true

      t.timestamps
    end
  end
end
