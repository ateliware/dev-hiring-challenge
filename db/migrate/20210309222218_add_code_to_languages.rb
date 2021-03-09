class AddCodeToLanguages < ActiveRecord::Migration[6.1]
  def change
    add_column :languages, :code, :string
  end
end
