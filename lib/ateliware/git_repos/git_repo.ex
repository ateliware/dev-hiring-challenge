defmodule Ateliware.GitRepos.GitRepo do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "git_repos" do
    field :avatar_url, :string
    field :description, :string
    field :forks, :integer
    field :full_name, :string
    field :git_id, :integer
    field :language, :string
    field :name, :string
    field :open_issues, :integer
    field :url, :string
    field :watchers_count, :integer

    timestamps()
  end

  @doc false
  def changeset(git_repo, attrs) do
    git_repo
    |> cast(attrs, [
      :avatar_url,
      :description,
      :forks,
      :git_id,
      :name,
      :full_name,
      :language,
      :url,
      :open_issues,
      :watchers_count
    ])
    |> validate_required([
      :avatar_url,
      :description,
      :forks,
      :git_id,
      :name,
      :full_name,
      :language,
      :url,
      :open_issues,
      :watchers_count
    ])
    |> unique_constraint(:git_id)
  end
end
