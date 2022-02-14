defmodule HighlightRepoWeb.RepoView do
  use HighlightRepoWeb, :view

  def render("repos_info.json", %{data: items}) do
    %{data: render_many(items, __MODULE__, "repo.json", as: :item)}
  end

  def render("repo.json", %{item: item}) do
    %{
      name: item.name,
      description: item.description,
      forks: item.forks,
      stars: item.stars,
      url: item.url,
      owner: %{
        avatar_url: item.owner.avatar_url,
        name: item.owner.name,
        url: item.owner.url
      }
    }
  end

  def render("error_message.json", %{message: message}) do
    %{message: message}
  end
end
