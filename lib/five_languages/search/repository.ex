defmodule FiveLanguages.Search.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  @fields [
    :name,
    :owner,
    :watchers,
    :forks,
    :clone_url,
    :language,
    :git_id,
    :created_at,
  ]

  schema "repositories" do
    field :name, :string
    field :owner, :string
    field :watchers, :integer
    field :forks, :integer
    field :clone_url, :string
    field :language, :string
    field :git_id, :integer
    field :created_at, :naive_datetime

    timestamps()
  end

  @doc false
  def changeset(repository, attrs) do
    repository
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
