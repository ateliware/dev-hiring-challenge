defmodule Ateliware.GithubApi do
  alias Ateliware.GithubApi.GetRepos

  defdelegate get_repos(
                language,
                page,
                per_page
              ),
              to: GetRepos
end
