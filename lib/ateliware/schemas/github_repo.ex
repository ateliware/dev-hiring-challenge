defmodule Ateliware.Schemas.GithubRepo do
  @moduledoc false

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
    field :stargazers_count, :integer
    field :url, :string
    field :html_url, :string
    field :description, :string
    field :watchers, :integer
    belongs_to :language, Language

    timestamps()
  end

  @doc false
  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [
      :name,
      :full_name,
      :watchers,
      :forks,
      :url,
      :html_url,
      :description,
      :stargazers_count,
      :homepage,
      :language_id
    ])
    |> foreign_key_constraint(:language_id)
    |> validate_required([:name, :full_name, :watchers, :forks, :url, :stargazers_count])
  end

  @doc """
  Used in `Ecto.Multi`'s `insert_all/5`
  """
  def apply_changeset_and_to_map(attrs, language_id) do
    attrs
    |> changeset()
    |> put_change(:inserted_at, naive_date_now())
    |> put_change(:updated_at, naive_date_now())
    |> put_change(:id, Ecto.UUID.autogenerate())
    |> put_change(:language_id, language_id)
    |> Ecto.Changeset.apply_changes()
    |> Map.from_struct()
    |> Enum.filter(fn {key, _} -> not Enum.member?([:__meta__, :__struct__, :language], key) end)
    |> Map.new()
  end

  defp naive_date_now, do: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
end
