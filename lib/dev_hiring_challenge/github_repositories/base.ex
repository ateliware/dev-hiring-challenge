defmodule DevHiringChallenge.GithubRepositories.Base do
  @moduledoc """
  GitHub API Base context.
  """

  require Logger

  @base_url "https://api.github.com/search/repositories"
  @headers [{"Content-Type", "application/json"}]

  defp make_request(query) do
    case HTTPoison.get(@base_url <> query, @headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, body}

      {:ok, %HTTPoison.Response{status_code: status_code}} ->
        {:error, status_code}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end

  defp decode_response({:ok, body}), do: {:ok, Poison.decode!(body)}

  defp decode_response({:error, error}) do
    Logger.error("[GithubRepositories] Request Error: #{inspect(error)}")

    {:error, error}
  end

  def call(query) do
    query
    |> make_request()
    |> decode_response()
  end
end
