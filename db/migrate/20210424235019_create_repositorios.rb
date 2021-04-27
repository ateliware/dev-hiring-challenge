class CreateRepositorios < ActiveRecord::Migration[5.2]
  def change
    create_table :repositorios do |t|
      t.string :nome
      t.text :descricao
      t.integer :score
      t.timestamp :data_criacao
      t.boolean :curated
      t.boolean :featured
      t.boolean :private
      t.integer :forks
      t.string :url

      t.timestamps
    end
  end
end
