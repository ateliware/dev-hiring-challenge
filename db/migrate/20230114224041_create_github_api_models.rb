class CreateGithubApiModels < ActiveRecord::Migration[7.0]
  def change
    create_table :github_api_models do |t|

      t.timestamps
    end
  end
end
