defmodule Ateliware.Schemas.GithubRepo do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ateliware.Schemas.Language

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "github_repos" do
    field :forks, :integer
    field :full_name, :string
    field :homepage, :string
    field :name, :string
    field :startgazers_count, :integer
    field :url, :string
    field :watchers, :integer
    belongs_to :language, Language

    timestamps()
  end

  @doc false
  def changeset(github_repo, attrs) do
    github_repo
    |> cast(attrs, [:name, :full_name, :watchers, :forks, :url, :startgazers_count, :homepage, :language_id])
    |> foreign_key_constraint(:language_id)
    |> validate_required([:name, :full_name, :watchers, :forks, :url, :startgazers_count])
  end
end
