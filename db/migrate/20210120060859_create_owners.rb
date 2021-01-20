class CreateOwners < ActiveRecord::Migration[6.0]
  def change
    create_table :owners do |t|
      t.string :login
      t.string :avatar_url
      t.string :html_url
      t.index [:login], unique: true
      t.timestamps
    end
  end
end
