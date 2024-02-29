defmodule HighlightRepo.Repo.Migrations.CreateOwners do
  use Ecto.Migration

  def change do
    create table(:owners) do
      add :name, :string
      add :avatar_url, :string
      add :url, :string

      timestamps()
    end
  end
end
