defmodule FiveLanguages.Git.Adapter do
  @moduledoc """
    Behaviour para os adapters
  """

  @callback search_repositories(map()) :: [map()] | :error
  @callback get_repository(map(), any()) :: map()
end
