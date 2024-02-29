defmodule HighlightRepo.Repo.Migrations.CreateRepos do
  use Ecto.Migration

  def change do
    create table(:repos) do
      add :name, :string
      add :description, :text
      add :forks, :integer
      add :stars, :integer
      add :url, :string

      timestamps()
    end
  end
end
