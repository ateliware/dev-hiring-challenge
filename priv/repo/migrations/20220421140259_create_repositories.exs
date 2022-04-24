defmodule DevChallenge.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :name, :string
      add :owner_login, :string
      add :avatar_url, :string
      add :url, :string
      add :stargazers_count, :integer
      add :language, :string
      add :description, :string

      timestamps()
    end

  end
end
