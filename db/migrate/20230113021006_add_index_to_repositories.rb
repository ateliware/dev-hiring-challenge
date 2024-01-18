class AddIndexToRepositories < ActiveRecord::Migration[7.0]
  def change
    add_index :repositories, :github_id, unique: true
  end
end
