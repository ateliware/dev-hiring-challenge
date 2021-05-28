defmodule ExHub.Request do
  @moduledoc """
    This module is responsible for requesting the repositories to the GitHub API.
    It also decodes it to an Elixir map.
  """

  # List of Languages
  @languages ["Elixir", "Ruby", "Erlang", "Go", "Clojure"]

  # Number of results retrieved from GitHub
  @per_page 10

  @callback get(language :: String.t()) :: map | {:error, String.t()}
  def get(language, headers \\ []) do
    language
    |> call(headers)
    |> content_type
    |> decode
  end

  def languages(), do: @languages

  # Makes a request to the GitHub API
  defp call(language, headers) do
    "https://api.github.com/search/repositories?q=language:#{language}&sort=stars&order_by=desc&per_page#{@per_page}"
    |> HTTPoison.get(headers)
    |> case do
      {:ok, %{body: raw, status_code: code, headers: headers}} ->
        {code, raw, headers}

      {:error, %{reason: reason}} ->
        {:error, reason, []}
    end
  end

  defp content_type({ok, body, headers}) do
    {ok, body, content_type(headers)}
  end

  defp content_type([{"Content-Type", val} | _]) do
    val
    |> String.split(";")
    |> List.first()
  end

  defp content_type([_ | t]), do: content_type(t)


  # Decode the response to an Elixir Map
  defp decode({_ok, body, "application/json"}) do
    body
    |> Poison.decode(keys: :atoms)
    |> case do
      {:ok, %{items: items} = _parsed} -> %{items: items}
      _ -> {:error, body}
    end
  end

  defp decode({ok, body, _}), do: {ok, body}
end
