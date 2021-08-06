defmodule GithubProject.Repo do
  use Ecto.Repo,
    otp_app: :github_project,
    adapter: Ecto.Adapters.Postgres
end
