defmodule GithubSearch.Service.Search do
  use Ecto.Schema
  import Ecto.Changeset

  alias GithubSearch.Service.Repository

  schema "searchs" do
    field :language, :string
    field :keyword, :string

    has_many :repositories, Repository

    timestamps()
  end

  @doc false
  def changeset(search, attrs) do
    search
    |> cast(attrs, [:language, :keyword])
    |> validate_required([:language, :keyword])
  end
end
