defmodule Ateliware.Structs.Github.GetRepoOptions do
  @moduledoc """
  Available parameters to gitub's find repo endpoint
  `https://api.github.com/search/repositories`

  To query for a specific language, add a `+language<language>` to the q param.

  [reference](https://docs.github.com/en/rest/reference/search#search-repositories)
  """

  @type t :: %__MODULE__{
          q: String.t(),
          language: String.t(),
          sort: nil | :stars | :forks | :updated,
          order: nil | :desc | :asc,
          per_page: nil | non_neg_integer(),
          page: nil | non_neg_integer()
        }

  defstruct [
    :q,
    :language,
    :sort,
    :order,
    :per_page,
    :page
  ]

  @spec prepare([__MODULE__.t()]) :: [__MODULE__.t()]
  def prepare(opts) do
    case Map.new(opts) do
      %{language: language} = opts ->
        opts
        |> Map.put(:q, "#{opts[:q]} language:#{language}")
        |> Map.delete(:language)
        |> Map.filter(fn {_, val} -> !is_nil(val) end)
        |> Map.to_list()

      _ ->
        opts
    end
  end
end
