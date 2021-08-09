defmodule GithubSearch.Repo.Migrations.CreateSearchs do
  use Ecto.Migration

  def change do
    create table(:searchs) do
      add :language, :string

      timestamps()
    end

  end
end
