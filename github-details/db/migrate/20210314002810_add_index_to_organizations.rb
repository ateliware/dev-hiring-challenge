class AddIndexToOrganizations < ActiveRecord::Migration[6.0]
  def change
    add_index :organizations, :slug, unique: true
  end
end
