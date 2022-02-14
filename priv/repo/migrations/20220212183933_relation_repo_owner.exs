defmodule HighlightRepo.Repo.Migrations.RelationRepoOwner do
  use Ecto.Migration

  def change do
    alter table(:repos) do
      add :owner_id, references(:owners)
    end
  end
end
