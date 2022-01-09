defmodule AteliwareWeb.Live.PageLive  do
  use AteliwareWeb, :live_view
  alias Phoenix.View

  @impl true
  def mount(_, _, socket) do
    {:ok, socket}
  end

  @impl true
  def render(assigns) do
    View.render(AteliwareWeb.PageView, "index.html", assigns)
  end
  
end
