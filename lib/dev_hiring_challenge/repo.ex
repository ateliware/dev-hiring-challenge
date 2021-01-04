defmodule DevHiringChallenge.Repo do
  use Ecto.Repo,
    otp_app: :dev_hiring_challenge,
    adapter: Ecto.Adapters.Postgres
end
