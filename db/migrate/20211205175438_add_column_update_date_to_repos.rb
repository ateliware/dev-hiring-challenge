class AddColumnUpdateDateToRepos < ActiveRecord::Migration[6.1]
  def change
    add_column :repos, :update_date, :datetime
  end
end
