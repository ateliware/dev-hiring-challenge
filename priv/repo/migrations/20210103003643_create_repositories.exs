defmodule DevHiringChallenge.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :name, :string
      add :description, :string
      add :html_url, :string
      add :language, :string
      add :stargazers_count, :integer

      timestamps()
    end
  end
end
