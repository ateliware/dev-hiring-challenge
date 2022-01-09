defmodule Ateliware.External.Github do
  @moduledoc """
  Github API wrapper
  """
  alias Ateliware.Helpers.URI
  alias Ateliware.Structs.GithubGetRepoOptions, as: GetRepoOptions

  @base_url "https://api.github.com/search/"
  # example https://api.github.com/search/repositories?q=language:ruby&sort=stars&order=desc&per_page=1



  @spec get_repos(GetRepoOptions.t()) :: {:ok, map} | {:error, any()}
  def get_repos(opts \\ []) do
  end

end
