# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Ateliware.Repo.insert!(%Ateliware.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Ateliware.Seeder do
  @moduledoc false

  alias Ateliware.Schemas.Language
  alias Ecto.Multi
  @now NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

  def seed do
    Multi.new()
    |> Multi.insert_all(:languages, Language, languages())
    |> Ateliware.Repo.transaction()

    Ateliware.GithubRepo.update_repos()
  end

  defp insert_language(multi, data) do
    Multi.insert(multi, :languages, data)
  end

  defp languages,
    do: [
      %{
        name: "elixir",
        display_name: "Elixir",
        color: "#7f0aca",
        inserted_at: @now,
        updated_at: @now
      },
      %{
        name: "rust",
        display_name: "Rust",
        color: "#d83416",
        inserted_at: @now,
        updated_at: @now
      },
      %{
        name: "typescript",
        display_name: "TypeScript",
        color: "#007acc",
        inserted_at: @now,
        updated_at: @now
      },
      %{
        name: "go",
        display_name: "Go",
        color: "#79d4fd",
        inserted_at: @now,
        updated_at: @now
      },
      %{
        name: "clojure",
        display_name: "Clojure",
        color: "#93d643",
        inserted_at: @now,
        updated_at: @now
      }
    ]
end

Ateliware.Seeder.seed()
