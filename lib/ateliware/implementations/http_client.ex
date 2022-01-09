defmodule Ateliware.Implementations.HttpClient do
  @behaviour Ateliware.Behaviours.HttpClient 

  def get(url), do: HTTPoison.get(url)
end
