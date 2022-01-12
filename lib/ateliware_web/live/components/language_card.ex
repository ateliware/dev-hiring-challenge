defmodule AteliwareWeb.Live.Components.LanguageCard do
  @moduledoc false

  use Phoenix.LiveComponent
  alias AteliwareWeb.Components.Icons
  alias AteliwareWeb.Router.Helpers, as: Routes

  @impl true
  def mount(socket), do: {:ok, assign(socket, collapsed?: true)}

  @impl true
  def update(assigns, socket) do
    {:ok, assign(socket, language: assigns.language)}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div class="flex items-center box-shadow-3xl sm:max-w-2xl flex-col w-full border-l-8 rounded-xl overflow-hidden" style={border_color(assigns.language.color)} >
      <div
        class="h-28 w-full bg-zinc-100 flex items-center justify-between px-8 cursor-pointer"
        style={border_color(assigns.language.color)} phx-click="click-card" phx-target={@myself}
      >
        <h4 class="grow m-auto text-lg"><%= @language.display_name %></h4>
        <Icons.collapse_arrow id={"#{@language.name}-colapse"} class="h-6 w-6 mr-2" collapsed?={@collapsed?} />
      </div>
      <%= if not(@collapsed?) and has_repos_loaded(@language.github_repos) do %>
        <div class="grid grid-cols-1 divide-y divide-primary w-full bg-zinc-100"> 
          <%= for repo <- @language.github_repos do %>
            <%= live_patch to: Routes.page_path(@socket, :index, repo.id), style: border_color(@language.color) do %>
              <div class="py-6 px-4 cursor-ponter flex items-center justify-between">
                <h4><%= repo.name %></h4>
                <div class="flex items-center justify-center ">
                  <span><%= repo.stargazers_count %></span>
                  <div class="text-yellow-500"><Icons.star /></div>
                  <Icons.arrow_right /> 
                </div>
              </div>
            <% end %>
          <% end %>
        </div>
      <% end %>
    </div>
    """
  end

  @impl true
  def handle_event("click-card", _, socket) do
    collapsed? = socket.assigns.collapsed?

    if collapsed? and not has_repos_loaded(socket.assigns.language.github_repos),
      do: send(self(), {:get_repos, socket.assigns.language.id})

    {:noreply, assign(socket, collapsed?: not collapsed?)}
  end

  defp has_repos_loaded(repos), do: is_list(repos) && length(repos) > 0

  defp border_color(color), do: "border-color: #{color}"
end
