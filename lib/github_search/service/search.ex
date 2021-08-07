defmodule GithubSearch.Service.Search do
  use Ecto.Schema
  import Ecto.Changeset

  alias GithubSearch.Service.Repository

  schema "searchs" do
    field :language, :string
    has_many :repositories, Repository

    timestamps()
  end

  @doc false
  def changeset(search, attrs) do
    search
    |> cast(attrs, [:language])
    |> validate_required([:language])
  end
end
