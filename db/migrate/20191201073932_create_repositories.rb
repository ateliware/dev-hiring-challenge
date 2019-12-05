class CreateRepositories < ActiveRecord::Migration[6.0]
  def change
    create_table :repositories do |t|
      t.integer :id_repository
      t.string :name
      t.string :login_name
      t.string :stars
      t.string :language

      t.timestamps
    end
  end
end
