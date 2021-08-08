defmodule GithubSearch.Repo.Migrations.AddKeywordToSearchs do
  use Ecto.Migration

  def change do
    alter table("searchs") do
      add :keyword, :string
    end
  end
end
