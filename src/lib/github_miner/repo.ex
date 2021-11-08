defmodule GithubMiner.Repo do
  use Ecto.Repo,
    otp_app: :github_miner,
    adapter: Ecto.Adapters.Postgres
end
