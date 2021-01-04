defmodule DevHiringChallenge.Factory do
  use ExMachina.Ecto, repo: DevHiringChallenge.Repo

  alias DevHiringChallenge.Repositories.Repository

  def repository_factory do
    %Repository{
      name: "Repo",
      description: "repo",
      html_url: "www.repo.com",
      language: "Ruby",
      stargazers_count: 1234
    }
  end
end
