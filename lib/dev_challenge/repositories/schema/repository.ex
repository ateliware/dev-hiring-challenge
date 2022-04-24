defmodule DevChallenge.Repositories.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  schema "repositories" do
    field :avatar_url, :string
    field :description, :string
    field :language, :string
    field :name, :string
    field :owner_login, :string
    field :stargazers_count, :integer
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(repository, attrs) do
    repository
    |> cast(attrs, [:name, :owner_login, :avatar_url, :url, :stargazers_count, :language, :description])
    |> validate_required([:name, :owner_login, :avatar_url, :url, :stargazers_count, :language, :description])
  end
end
