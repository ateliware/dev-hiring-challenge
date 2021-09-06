defmodule GhTopRepos.Repo.Migrations.CreateGhRepo do
  use Ecto.Migration

  def up do
    create table(:gh_repo) do
      add :name, :string
      add :full_name, :string
      add :description, :string
      add :url, :string
      add :html_url, :string
      add :forks_count, :integer
      add :forks, :integer
      add :stargazers_count, :integer
      add :watchers_count, :integer
      add :watchers, :integer

      timestamps()
    end
  end

  def down do
    drop table(:gh_repo)
  end
end
