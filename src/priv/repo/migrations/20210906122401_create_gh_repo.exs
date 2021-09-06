defmodule GhTopRepos.Repo.Migrations.CreateGhRepo do
  use Ecto.Migration

  def change do
    create table(:gh_repo) do

      timestamps()
    end

  end
end
