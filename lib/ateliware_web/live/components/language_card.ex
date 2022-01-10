defmodule AteliwareWeb.Live.Components.LanguageCard do
  @moduledoc false

  use Phoenix.LiveComponent
  alias AteliwareWeb.Components.Icons
  alias AteliwareWeb.Router.Helpers, as: Routes

  @impl true
  def update(assigns, socket) do
    {:ok, assign(socket, language: assigns.language, collapsed?: true)}
  end

  @impl true
  def render(assigns) do
    assigns = assign_new(assigns, :collapsed?, fn -> true end)
    ~H"""
    <div
      class="relative h-28 w-full z-20 sm:max-w-xl box-shadow-2xl flex items-center justify-between px-8 cursor-pointer"
       phx-click="click-card" phx-target={@myself}
    >
      <div class="absolute  rounded-md border-l-8 rounded-md  h-full z-10 w-full bg-zinc-400 left-0" style={border_color(assigns.language.color)}></div>
      <img class="max-h-12 w-auto z-20" src={Routes.static_path(@socket, @language.image_url)} />
      <h4 class="font-bold grow z-20 m-auto text-center"><%= @language.display_name %></h4>
      <Icons.collapse_arrow id={"#{@language.name}-colapse"} class="h-6 w-6 z-20 mr-2" collapsed?={@collapsed?} />
    </div>
    """
  end

  @impl true
  def handle_event("click-card", _, socket) do
    IO.inspect socket.assigns.collapsed?
    {:noreply, assign(socket, collapsed?: not(socket.assigns.collapsed?))}
  end

  defp border_color(color), do: "border-color: #{color}"
  
end
