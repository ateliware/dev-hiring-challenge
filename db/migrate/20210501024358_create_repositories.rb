class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.jsonb :repo

      t.timestamps
    end
  end
end
