defmodule Ateliware.Repo.Migrations.CreateLanguages do
  use Ecto.Migration

  alias Ateliware.Schemas.Language

  def change do
    create table(:languages, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, unique: true
      add :color, :string
      add :display_name, :string

      timestamps()
    end

    create unique_index(:languages, :name)

    flush()

    Enum.each(languages(), fn lang ->
      Ateliware.Repo.insert!(Language.changeset(lang), on_conflict: :nothing)
    end)

    flush()
  end

  defp languages,
    do: [
      %{
        name: "elixir",
        display_name: "Elixir",
        color: "#7f0aca"
      },
      %{
        name: "rust",
        display_name: "Rust",
        color: "#d83416"
      },
      %{
        name: "typescript",
        display_name: "TypeScript",
        color: "#007acc"
      },
      %{
        name: "go",
        display_name: "Go",
        color: "#79d4fd"
      },
      %{
        name: "clojure",
        display_name: "Clojure",
        color: "#93d643"
      }
    ]
end
