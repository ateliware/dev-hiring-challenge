defmodule DevHiringChallenge.GithubRepositories.Search do
  @moduledoc """
  Github API to search top repositories context.

  ## Examples

    iex> DevHiringChallenge.GithubRepositories.Search.call("1", "Ruby")
    {:ok,
      [
        [
          created_at: "2008-04-11T02:19:47Z",
          description: "Ruby on Rails",
          homepage: "https://rubyonrails.org",
          html_url: "https://github.com/rails/rails",
          name: "rails",
          stargazers_count: 47311
        ]
      ]
    }

    iex> DevHiringChallenge.GithubRepositories.Search.call("1", "XYZ")
    {:error, 422}
  """

  alias DevHiringChallenge.GithubRepositories.Base

  @expected_fields ~w(name description html_url language stargazers_count)

  defp prepare_query(count, language) do
    "?q=language:" <> language <> "&sort=stars&order=desc&per_page=" <> count
  end

  defp make_request(query) do
    Base.call(query)
  end

  defp parse_items(items) do
    Enum.map(items, fn item ->
      item
      |> Map.take(@expected_fields)
      |> Enum.map(fn {k, v} -> {String.to_atom(k), v} end)
    end)
  end

  defp parse_response({:ok, response}) do
    parsed_response = parse_items(response["items"])
    {:ok, parsed_response}
  end

  defp parse_response({:error, error}), do: {:error, error}

  def call(count, language) do
    prepare_query(count, language)
    |> make_request()
    |> parse_response()
  end
end
