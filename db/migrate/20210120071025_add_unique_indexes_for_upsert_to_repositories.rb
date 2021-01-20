class AddUniqueIndexesForUpsertToRepositories < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'btree_gin'

    add_index :repositories, Github::RepositoriesProcessor::UNIQUE_FIELDS,
      name: 'index_repositories_uniqueness', unique: true
  end
end
