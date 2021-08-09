defmodule GithubSearch.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :name, :string
      add :description, :string
      add :url, :string
      add :forks, :integer
      add :watchers, :integer
      add :language, :string

      timestamps()
    end

  end
end
