defmodule HighlightRepo.Repo do
  use Ecto.Repo,
    otp_app: :highlight_repo,
    adapter: Ecto.Adapters.Postgres
end
