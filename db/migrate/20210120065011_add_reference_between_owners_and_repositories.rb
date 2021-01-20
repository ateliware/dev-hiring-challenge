class AddReferenceBetweenOwnersAndRepositories < ActiveRecord::Migration[6.0]
  def change
    add_reference :repositories, :owner, index: true, foreign_key: true
  end
end
