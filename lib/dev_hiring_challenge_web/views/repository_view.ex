defmodule DevHiringChallengeWeb.RepositoryView do
  use DevHiringChallengeWeb, :view

  def languages(), do: DevHiringChallenge.Repositories.Repository.languages()

  def active_class(current_language, language) do
    if current_language == language, do: "button button-active", else: "button"
  end
end
