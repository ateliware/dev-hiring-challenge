defmodule GhTopRepos.Repo do
  use Ecto.Repo,
    otp_app: :gh_top_repos,
    adapter: Ecto.Adapters.Postgres
end
