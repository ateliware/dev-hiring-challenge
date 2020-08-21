defmodule Minelang.Repo do
  use Ecto.Repo,
    otp_app: :minelang,
    adapter: Ecto.Adapters.Postgres
end
