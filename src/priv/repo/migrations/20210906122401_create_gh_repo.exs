defmodule GhTopRepos.Repo.Migrations.CreateGhRepo do
  use Ecto.Migration

  def up do
    create table(:gh_repo) do
      add :github_id, :integer
      add :name, :string
      add :full_name, :string
      add :description, :string
      add :url, :string
      add :html_url, :string
      add :language, :string
      add :forks_count, :integer
      add :forks, :integer
      add :stargazers_count, :integer
      add :watchers_count, :integer
      add :watchers, :integer

      timestamps()
    end

    create unique_index(:gh_repo, [:github_id])
  end

  def down do
    drop table(:gh_repo)
  end
end
