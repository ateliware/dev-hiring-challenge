defmodule Ateliware.Behaviours.HttpClient do
  @callback get(url :: String.t()) :: {:ok, map()} | {:error, any()} 
end
