defmodule ExHub.Repo do
  use Ecto.Repo,
    otp_app: :ex_hub,
    adapter: Ecto.Adapters.Postgres
end
