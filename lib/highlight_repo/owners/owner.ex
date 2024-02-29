defmodule HighlightRepo.Owners.Owner do
@moduledoc """
Owner
"""
  use Ecto.Schema
  import Ecto.Changeset

  schema "owners" do
    field :avatar_url, :string
    field :name, :string
    field :url, :string

    has_many :repos, HighlightRepo.Repos.GitRepo
    timestamps()
  end

  @doc false
  def changeset(owner, attrs) do
    owner
    |> cast(attrs, [:name, :avatar_url, :url])
    |> validate_required([:name, :avatar_url, :url])
  end
end
