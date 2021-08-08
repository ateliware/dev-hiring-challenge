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
end
