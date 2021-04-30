class RemoveNullFromRepo < ActiveRecord::Migration[6.1]
  def change
    change_column_null :repos, :language, true
  end
end
