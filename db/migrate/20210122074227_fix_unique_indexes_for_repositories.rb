class FixUniqueIndexesForRepositories < ActiveRecord::Migration[6.0]
  def change
    remove_index :repositories, name: 'index_repositories_uniqueness'

    add_index :repositories, Github::RepositoriesProcessor::UNIQUE_FIELDS,
              name: 'index_repositories_uniqueness', unique: true

    Repository.delete_all
  end

  def down
    remove_index :repositories, name: 'index_repositories_uniqueness'

    old_unique_fields = Github::RepositoriesProcessor::UNIQUE_FIELDS.dup.append(:github_repo_id)
    add_index :repositories, old_unique_fields, name: 'index_repositories_uniqueness', unique: true
  end
end
