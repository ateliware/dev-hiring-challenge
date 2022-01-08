defmodule Ateliware.Repo do
  use Ecto.Repo,
    otp_app: :ateliware,
    adapter: Ecto.Adapters.Postgres
end
