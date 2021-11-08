defmodule GithubMiner.Repositories.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  schema "repositories" do
    field :avatar_url, :string
    field :forks, :integer
    field :full_name, :string
    field :language, :string
    field :login, :string
    field :repository_id, :integer
    field :stargazers_count, :integer
    field :type, :string
    field :watchers_count, :integer

    timestamps()
  end

  @doc false
  def changeset(repository, attrs) do
    repository
    |> cast(attrs, [
      :repository_id,
      :forks,
      :full_name,
      :language,
      :stargazers_count,
      :watchers_count,
      :avatar_url,
      :login,
      :type
    ])
    |> validate_required([
      :repository_id,
      :forks,
      :full_name,
      :language,
      :stargazers_count,
      :watchers_count,
      :avatar_url,
      :login,
      :type
    ])
  end
end
