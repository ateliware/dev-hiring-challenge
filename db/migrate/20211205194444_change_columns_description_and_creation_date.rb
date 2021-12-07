class ChangeColumnsDescriptionAndCreationDate < ActiveRecord::Migration[6.1]
  def change
    change_column :repos, :description, :text
    change_column :repos, :creation_date, 'timestamp USING CAST(creation_date AS timestamp)'
  end
end
