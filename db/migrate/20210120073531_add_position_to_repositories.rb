class AddPositionToRepositories < ActiveRecord::Migration[6.0]
  def up
    add_column :repositories, :position, :integer, default: 0

    Repository.order(updated_at: :desc).find_in_batches(batch_size: 50) do |batch|
      batch.each_with_index do |repo, index|
        repo.update(position: index)
      end
    end

    change_column_default :repositories, :position, default: 0, null: false
    add_index :repositories, :position
  end

  def down
    remove_column :repositories, :position, :integer
  end
end
