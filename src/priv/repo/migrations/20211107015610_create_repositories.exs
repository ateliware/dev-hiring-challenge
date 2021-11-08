defmodule GithubMiner.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :repository_id, :integer
      add :forks, :integer
      add :language, :string
      add :stargazers_count, :integer
      add :full_name, :string
      add :watchers_count, :integer
      add :avatar_url, :string
      add :login, :string
      add :type, :string

      timestamps()
    end
  end
end
