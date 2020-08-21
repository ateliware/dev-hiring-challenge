defmodule Mine.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :name, :string
      add :org, :string
      add :description, :string
      add :stargazers_count, :integer
      add :watchers_count, :integer
      add :open_issues, :integer
      add :forks, :integer
      add :license, :string
    end
  end
end
