class AddMissingFieldsToOrganization < ActiveRecord::Migration[6.0]
  def change
    add_column :organizations, :is_verified, :boolean, default: false
    add_column :organizations, :blog, :string
  end
end
