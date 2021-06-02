class CreateOwner < ActiveRecord::Migration[6.0]
  def change
    create_table :owners do |t|
      t.string :login
      t.string :avatar_url
    end
  end
end
