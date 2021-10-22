defmodule GhTopRepos.GHRepo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "gh_repo" do
    field :github_id, :integer
    field :name, :string
    field :full_name, :string
    field :description, :string
    field :url, :string
    field :html_url, :string
    field :language, :string
    field :forks_count, :integer
    field :forks, :integer
    field :stargazers_count, :integer
    field :watchers_count, :integer
    field :watchers, :integer
    field :subscribers_count, :integer
    field :avatar_url, :string
    field :ssh_url, :string
    field :clone_url, :string

    timestamps()
  end

  @doc false
  def changeset(gh_repo, attrs) do
    gh_repo
    |> cast(attrs, [:github_id, :name, :full_name, :description,
                    :url, :html_url, :language, :forks, :forks_count,
                    :stargazers_count, :watchers, :watchers_count,
                    :subscribers_count, :avatar_url, :ssh_url, :clone_url,
                    :inserted_at, :updated_at])
    |> validate_required([:name, :url, :html_url])
  end
end
