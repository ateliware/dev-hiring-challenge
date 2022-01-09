defmodule Ateliware.External.Github do
  @moduledoc """
  Github API wrapper
  """
  alias Ateliware.Helpers.URI
  alias Ateliware.Implementations.HttpClient
  alias Ateliware.Structs.Github.GetRepoOptions

  @base_url "https://api.github.com/search/repositories"
  # example https://api.github.com/search/repositories?q=language:ruby&sort=stars&order=desc&per_page=1

  @spec get_repos([GetRepoOptions.t()]) :: {:ok, map()} | {:error, any()}
  def get_repos(opts \\ []) do
    with opts <- GetRepoOptions.prepare(opts),
         url <- URI.add_params_to_url(@base_url, opts),
         {:ok, %{status_code: 200, body: raw_body}} <- client().get(url) do
      Jason.decode(raw_body)
    else
      _ -> {:error, "unexpected error"}
    end
  end

  defp client, do: Application.get_env(:ateliware, :http_client, HttpClient)
end
