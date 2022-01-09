defmodule Ateliware.Repo.Migrations.CreateLanguages do
  use Ecto.Migration

  def change do
    create table(:languages, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, unique: true
      add :color, :string
      add :display_name, :string

      timestamps()
    end
  end
end
