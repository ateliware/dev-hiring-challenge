defmodule GhTopRepos.GHRepo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "gh_repo" do
    field :name, :string
    field :full_name, :string
    field :description, :string
    field :url, :string
    field :html_url, :string
    field :forks_count, :integer
    field :forks, :integer
    field :stargazers_count, :integer
    field :watchers_count, :integer
    field :watchers, :integer

    timestamps()
  end

  @doc false
  def changeset(gh_repo, attrs) do
    gh_repo
    |> cast(attrs, [:name, :url, :html_url])
    |> validate_required([:name, :url, :html_url])
  end
end
