class AddNotNullConstraintToLanguageName < ActiveRecord::Migration[7.0]
  def change
    change_column_null :languages, :name, false
  end
end
