class AddTopicToRepo < ActiveRecord::Migration[6.1]
  def change
    add_reference :repos, :topic, null: false, foreign_key: true
  end
end
