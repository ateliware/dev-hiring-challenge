defmodule ExHubWeb.DisplayLive do
  @moduledoc """
    LiveView responsible for displaying a single repository.
  """
  use ExHubWeb, :live_view

  alias ExHub.Utils

  # Gets the result from the DisplayComponent, atomify it and assigns to the socket
  def handle_params(result, _url, socket) do
    result = Utils.atomify_map(result)

    {:noreply,
     socket
     |> assign(:result, result)}
  end
end
