class CreateImporters < ActiveRecord::Migration[6.0]
  def change
    create_table :importers do |t|
      t.jsonb :response
    end
  end
end
