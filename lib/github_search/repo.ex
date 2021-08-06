defmodule GithubSearch.Repo do
  use Ecto.Repo,
    otp_app: :github_search,
    adapter: Ecto.Adapters.Postgres
end
