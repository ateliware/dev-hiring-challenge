class RemoveNullFromRepoHomepage < ActiveRecord::Migration[6.1]
  def change
    change_column_null :repos, :homepage, true
  end
end
