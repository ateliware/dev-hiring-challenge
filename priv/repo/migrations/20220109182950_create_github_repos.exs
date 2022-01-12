defmodule Ateliware.Repo.Migrations.CreateGithubRepos do
  use Ecto.Migration

  def change do
    create table(:github_repos, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :full_name, :string
      add :watchers, :integer
      add :forks, :integer
      add :url, :string
      add :stargazers_count, :integer
      add :description, :string
      add :html_url, :string
      add :homepage, :string
      add :language_id, references(:languages, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:github_repos, [:language_id])
  end
end
