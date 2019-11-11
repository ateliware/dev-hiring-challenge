class AddLanguageToRepositories < ActiveRecord::Migration[5.2]
  def change
    add_column :repositories, :language, :string
  end
end
