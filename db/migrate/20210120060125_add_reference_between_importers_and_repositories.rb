class AddReferenceBetweenImportersAndRepositories < ActiveRecord::Migration[6.0]
  def change
    add_reference :repositories, :importer, index: true, foreign_key: true
  end
end
