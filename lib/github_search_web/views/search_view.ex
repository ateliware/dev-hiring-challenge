defmodule GithubSearchWeb.SearchView do
  use GithubSearchWeb, :view

  def languages do
    %{
      "Elixir": "elixir",
      Ruby: "ruby",
      PHP: "php",
      JavaScript: "javascript",
      Python: "python"
    }
  end

  def formatted_inserted_at(inserted_at) do
    inserted_at
    |> Timex.format!("%d/%m/%Y %T", :strftime)
  end
end
