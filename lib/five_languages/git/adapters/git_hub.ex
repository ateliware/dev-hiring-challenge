defmodule FiveLanguages.Git.Adapters.GitHub do
  @moduledoc """
    Adapter para Api do Git Hub
  """

  @behaviour FiveLanguages.Git.Adapter

  @url "https://api.github.com"

  @doc """
    Requisição para a pesquisa de repositórios

  ## Examples
    iex> search_repositories([q: "linguage:elixir", sort: "stars", order: "desc"])
    {:ok, %{items: [%{clone_url: _, forks: _, ...}, ...]}}

  """
  def search_repositories(params) do
    "#{@url}/search/repositories"
    |> HTTPoison.get([], params: params)
    |> handler_response()
  end

  @doc """
    Requisição para a consulta de um repositório específico

  ## Examples
    iex> search_repositories(%{owner: "elixir-lang", name: "elixir"})
    {:ok, %{name: _, forks: _, ...}}

  """
  def get_repository(%{owner: owner, name: name}, opts \\ []) do
    "#{@url}/repos/#{owner}/#{name}"
    |> HTTPoison.get()
    |> handler_response()
  end

  defp handler_response(response) do
    case response do
      {:ok, %HTTPoison.Response{body: body, status_code: 200}} ->
        {:ok, Jason.decode!(body, keys: :atoms)}

      {:ok, %HTTPoison.Response{status_code: 422}} ->
        {:error, :unprocessable_entity}

      _ ->
        {:error, :another_error}
    end
  end
end
