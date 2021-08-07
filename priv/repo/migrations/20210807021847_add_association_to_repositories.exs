defmodule GithubSearch.Repo.Migrations.AddAssociationToRepositories do
  use Ecto.Migration

  def change do
    alter table("repositories") do
      add :search_id, references(:searchs)
    end
  end
end
