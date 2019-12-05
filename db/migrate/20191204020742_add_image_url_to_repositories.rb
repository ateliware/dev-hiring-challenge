class AddImageUrlToRepositories < ActiveRecord::Migration[6.0]
  def change
    add_column :repositories, :image_url, :string
  end
end
