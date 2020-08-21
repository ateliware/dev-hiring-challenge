defmodule Mine.Repo do
  use Ecto.Repo,
    otp_app: :mine,
    adapter: Ecto.Adapters.Postgres
end
