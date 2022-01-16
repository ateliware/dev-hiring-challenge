defmodule Ateliware.Implementations.HttpClient do
  @moduledoc false
  @behaviour Ateliware.Behaviours.HttpClient

  @doc """
  Sends a get request given a url.
  returns an `{:ok, HTTPoison.Response}` struct
  """
  def get(url), do: HTTPoison.get(url)
end
