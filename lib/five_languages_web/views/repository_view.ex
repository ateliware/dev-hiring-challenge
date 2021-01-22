defmodule FiveLanguagesWeb.RepositoryView do
  use FiveLanguagesWeb, :view

  def format_date_hour(date) when is_bitstring(date) do
    date
    |> Timex.parse!("{ISO:Extended}")
    |> Timex.format!("%d/%m/%Y", :strftime)
  end

  def format_date_hour(date) do
    date
    |> Timex.to_datetime()
    |> Timex.format!("%d/%m/%Y", :strftime)
  end
end
