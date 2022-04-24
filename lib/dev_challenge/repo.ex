defmodule DevChallenge.Repo do
  use Ecto.Repo,
    otp_app: :dev_challenge,
    adapter: Ecto.Adapters.Postgres
end
