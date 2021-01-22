defmodule FiveLanguages.Repo do
  use Ecto.Repo,
    otp_app: :five_languages,
    adapter: Ecto.Adapters.Postgres
end
