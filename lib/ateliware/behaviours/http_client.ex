defmodule Ateliware.Behaviours.HttpClient do
  @moduledoc """
  defines the http client behaviour.
  may grow as the project requirements changes.
  """

  @callback get(url :: String.t()) :: {:ok, map()} | {:error, any()}
end
