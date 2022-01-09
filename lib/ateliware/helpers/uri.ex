defmodule Ateliware.Helpers.URI do

  @doc """
  Adds 
  """
  @spec add_params_to_url(String.t(), Keyword.t()) :: String.t()
  def add_params_to_url(uri, params) do
    uri
      |> URI.parse
      |> Map.put(:query, URI.encode_query(params))
      |> URI.to_string
  end
end
