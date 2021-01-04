defmodule DevHiringChallenge.Repositories.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(name description html_url language stargazers_count)a

  schema "repositories" do
    field :name, :string
    field :description, :string
    field :html_url, :string
    field :language, :string
    field :stargazers_count, :integer

    timestamps()
  end

  def changeset(repository, attrs) do
    repository
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end

  @languages ~w(Ruby Elixir Python Javascript C++)

  @doc false
  def languages(), do: @languages
end
