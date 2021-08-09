defmodule GithubSearch.Repo do
  use Ecto.Repo,
    otp_app: :github_search,
    adapter: Ecto.Adapters.Postgres

  use Kerosene, per_page: 5
end
