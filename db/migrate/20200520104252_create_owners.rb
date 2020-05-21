class CreateOwners < ActiveRecord::Migration[6.0]
  def change
    create_table :owners do |t|
      t.string :github_login
      t.string :avatar_url
      t.string :github_url

      t.timestamps
    end

    add_reference :repositories, :owner, foreign_key: true, null: true
    add_column :repositories, :github_url, :string
  end
end
