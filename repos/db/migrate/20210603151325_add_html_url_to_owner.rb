class AddHtmlUrlToOwner < ActiveRecord::Migration[6.0]
  def change
    add_column :owners, :html_url, :text
  end
end
