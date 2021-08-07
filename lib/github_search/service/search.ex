defmodule GithubSearch.Service.Search do
  use Ecto.Schema
  import Ecto.Changeset

  schema "searchs" do
    field :language, :string

    timestamps()
  end

  @doc false
  def changeset(search, attrs) do
    search
    |> cast(attrs, [:language])
    |> validate_required([:language])
  end
end
