defmodule FiveLanguages.Git do
  @moduledoc """
    Modulo que implementa o Behaviour e obtêm o adapter adequado ao ambiente
  """

  @doc """
    Requisição para a pesquisa de repositórios
  """
  def search_repositories(params),
    do: adapter().search_repositories(params)

  @doc """
    Requisição para a consulta de um repositório específico
  """
  def get_repository(params, opts \\ []),
    do: adapter().get_repository(params, opts)

  defp adapter do
    :five_languages
    |> Application.get_env(__MODULE__)
    |> Keyword.fetch!(:adapter)
  end
end
