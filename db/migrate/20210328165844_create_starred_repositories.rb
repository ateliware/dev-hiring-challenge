class CreateStarredRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :starred_repositories do |t|
      t.references :user, index: true
      t.references :repository, index: true
      t.timestamps
    end
  end
end
