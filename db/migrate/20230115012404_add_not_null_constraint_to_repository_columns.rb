class AddNotNullConstraintToRepositoryColumns < ActiveRecord::Migration[7.0]
  def change
    change_column_null :repositories, :name, false
    change_column_null :repositories, :full_name, false
    change_column_null :repositories, :github_id, false
    change_column_null :repositories, :node_id, false
    change_column_null :repositories, :stars, false
    change_column_null :repositories, :url, false
    change_column_null :repositories, :forks, false
    change_column_null :repositories, :open_issues, false
    change_column_null :repositories, :origin_created_at, false
    change_column_null :repositories, :origin_updated_at, false
  end
end
