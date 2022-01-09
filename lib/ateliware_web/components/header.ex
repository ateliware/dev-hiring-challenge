defmodule AteliwareWeb.Components.Header do
  @moduledoc false

  use Phoenix.Component
  import Phoenix.HTML.Link
  alias AteliwareWeb.Components.Icons

  def header(assigns) do
    ~H"""
    <div class="w-full bg-zinc-800 h-16 flex items-center justify-between px-3 sm:px-5 md:px-8 drop-shadow-2xl">
      <h1 class="text-xl">Ateliware Challenge</h1> 
      <%= link to: "https://github.com/hammsvietro/dev-hiring-challenge" do %>
      <Icons.code id="code__icon"/>
      <% end %>

    </div>
    """
  end
end
