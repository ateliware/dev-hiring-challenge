class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :slug
      t.string :name
      t.string :description
      t.string :avatar_url

      t.timestamps
    end
  end
end
