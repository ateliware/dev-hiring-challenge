defmodule FiveLanguages.Repo.Migrations.CreateRepositories do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :name,        :string
      add :owner,       :string
      add :watchers,    :integer
      add :forks,       :integer
      add :clone_url,   :string
      add :language,    :string
      add :git_id,      :integer
      add :created_at,  :naive_datetime

      timestamps()
    end

  end
end
