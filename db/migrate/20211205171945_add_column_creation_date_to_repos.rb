class AddColumnCreationDateToRepos < ActiveRecord::Migration[6.1]
  def change
    add_column :repos, :creation_date, :string
  end
end
