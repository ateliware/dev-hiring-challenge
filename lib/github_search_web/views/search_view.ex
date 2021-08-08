defmodule GithubSearchWeb.SearchView do
  use GithubSearchWeb, :view

  def languages do
    %{
      elixir: "elixir",
      ruby: "ruby",
      php: "php",
      javascript: "javascript",
      python: "python"
    }
  end
end
