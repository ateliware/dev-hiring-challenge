defmodule Ateliware.Structs.GithubGetRepoOptions do
  @moduledoc """
  Available parameters to gitub's find repo endpoint
  `https://api.github.com/search/repositories`

  To query for a specific language, add a `+language<language>` to the q param.

  [reference](https://docs.github.com/en/rest/reference/search#search-repositories)
  """


  @type t :: %__MODULE__{
    q: String.t(),
    sort: nil | :stars | :forks | :updated
    order: nil | :desc | :asc
    per_page: nil | non_neg_integer()
    page: nil | non_neg_integer()
  }

  defstruct [
    :q,
    :sort,
    :order,
    :per_page,
    :page
  ]
end
