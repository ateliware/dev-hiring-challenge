defmodule Minelang.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  schema "repositories" do
    field :description, :string
    field :forks, :integer
    field :license, :string
    field :name, :string
    field :open_issues, :integer
    field :org, :string
    field :stargazers_count, :integer
    field :watchers_count, :integer

    timestamps()
  end

  @doc false
  def changeset(repository, attrs) do
    repository
    |> cast(attrs, [:name, :org, :description, :stargazers_count, :watchers_count, :open_issues, :forks, :license])
    |> validate_required([:name, :org, :description, :stargazers_count, :watchers_count, :open_issues, :forks, :license])
  end
end
