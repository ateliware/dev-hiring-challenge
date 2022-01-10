defmodule Ateliware.Schemas.Language do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ateliware.Repo
  alias Ateliware.Schemas.GithubRepo
  alias __MODULE__, as: Language

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "languages" do
    field :color, :string
    field :name, :string, unique: true
    field :display_name, :string
    field :image_url, :string

    has_many :github_repos, GithubRepo, foreign_key: :language_id, references: :id 

    timestamps()
  end

  @doc false
  def changeset(language, attrs) do
    language
    |> cast(attrs, [:display_name, :iamge_url, :name, :color])
    |> validate_required([:display_name, :image_url, :name, :color])
  end

  @spec get_languages() :: [Language]
  def get_languages() do
    Repo.all(Language)
  end
end
