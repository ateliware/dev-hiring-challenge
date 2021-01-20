class AddFinishedAtToImporters < ActiveRecord::Migration[6.0]
  def change
    add_column :importers, :finished_at, :datetime
  end
end
