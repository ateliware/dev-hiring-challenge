defmodule AteliwareWeb.Components.Header do
  @moduledoc false

  use Phoenix.Component
  import Phoenix.HTML.Link
  alias AteliwareWeb.Components.Icons

  def header(assigns) do
    ~H"""
    <div class="w-full h-16 flex items-center justify-between px-5 md:px-8 drop-shadow-2xl">
      <h1 class="text-2xl">Ateliware Challenge</h1> 
      <%= link to: "https://github.com/hammsvietro/dev-hiring-challenge", class: "hover:text-primary ", target: "_blank" do %>
        <Icons.code id="code__icon" class="transition-400 transition-colors" />
      <% end %>

    </div>
    """
  end
end
