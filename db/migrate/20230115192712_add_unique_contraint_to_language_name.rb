class AddUniqueContraintToLanguageName < ActiveRecord::Migration[7.0]
  def change
    add_index :languages, :name, unique: true
  end
end
