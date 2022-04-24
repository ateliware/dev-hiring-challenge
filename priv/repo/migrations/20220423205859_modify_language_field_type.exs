defmodule DevChallenge.Repo.Migrations.ModifyLanguageFieldType do
  use Ecto.Migration

  def change do
    alter table(:repositories) do
      modify(:language, :citext, null: false)
    end
  end
end
