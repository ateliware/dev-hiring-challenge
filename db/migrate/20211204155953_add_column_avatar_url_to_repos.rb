class AddColumnAvatarUrlToRepos < ActiveRecord::Migration[6.1]
  def change
    add_column :repos, :avatar_url, :string
  end
end
