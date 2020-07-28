class AddBooleanToSearches < ActiveRecord::Migration[6.0]
  def change
    add_column :searches, :favorite, :boolean
  end
end
