defmodule Mine.Repositories do
  use Ecto.Schema

  schema "repositories" do
    field(:name, :string)
    field(:org, :string)
    field(:description, :string)
    field(:stargazers_count, :integer)
    field(:watchers_count, :integer)
    field(:open_issues, :integer)
    field(:forks, :integer)
    field(:license, :string)
    # timestamps()
  end

  def changeset(repositories, params \\ %{}) do
    repositories
    |> Ecto.Changeset.cast(params, [
      :name,
      :org,
      :description,
      :stargazers_count,
      :watchers_count,
      :open_issues,
      :forks,
      :license
    ])
  end
end
