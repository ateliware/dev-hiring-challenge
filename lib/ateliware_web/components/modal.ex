defmodule AteliwareWeb.Components.Modal do
  import Phoenix.LiveView.Helpers
  alias Phoenix.LiveView.JS

  def modal(assigns) do
    ~H"""
    <%= if Map.get(assigns, :show, true) do  %>
      <div
        class="min-w-screen h-screen fade-in fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id={@id}
        phx-remove={hide_modal(@id)}
      >
        <div class="absolute bg-black opacity-40 inset-0 z-0"></div>
        <div
          id={"content"<>@id}
          phx-click-away={assigns[:click_away]}
          class="w-full max-w-lg p-5 relative mx-auto fade-in my-auto rounded-xl shadow-lg  bg-zinc-100"
        >
          <!--content-->
          <div>
            <%= if header = Map.get(assigns, :header) do render_slot(header) end %>
            <%= render_slot(@inner_block) %>
            <%= if footer = Map.get(assigns, :footer) do render_slot(footer) end %>
            <div class="flex items-center justify-center">
              <%= if buttons = Map.get(assigns, :buttons) do render_slot(buttons) end %>
            </div>
          </div>
        </div>
      </div>
    <% end %>
    """
  end

  defp hide_modal(id, js \\ %JS{}) do
    js
      |> JS.hide(transition: "fade-out", to: "##{id}")
      |> JS.hide(transition: "fade-out", to: "#content-#{id}")
  end

end
