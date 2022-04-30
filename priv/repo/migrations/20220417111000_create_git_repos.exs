defmodule SmartGit.Repo.Migrations.CreateGitRepos do
  use Ecto.Migration

  def change do
    create table(:git_repos, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :avatar_url, :string
      add :description, :text
      add :forks, :integer
      add :git_id, :integer
      add :name, :string
      add :full_name, :string
      add :language, :string
      add :url, :string
      add :open_issues, :integer
      add :watchers_count, :integer

      timestamps()
    end

    create unique_index(:git_repos, [:git_id])
  end
end
