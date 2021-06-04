class AddHtmlUrlToRepositorios < ActiveRecord::Migration[6.0]
  def change
    add_column :repositorios, :html_url, :text
  end
end
