defmodule HighlightRepo.Repos.GitRepo do
@moduledoc """
GitRepo
"""
  use Ecto.Schema
  import Ecto.Changeset

  schema "repos" do
    field :description, :string
    field :forks, :integer
    field :name, :string
    field :stars, :integer
    field :url, :string

    belongs_to :owner, HighlightRepo.Owners.Owner
    timestamps()
  end

  @doc false
  def changeset(git_repos, attrs) do
    git_repos
    |> cast(attrs, [:name, :description, :forks, :stars, :url])
    |> validate_required([:name, :description, :forks, :stars, :url])
  end
end
