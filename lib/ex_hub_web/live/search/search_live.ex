defmodule ExHubWeb.SearchLive do
  @moduledoc """
    Application's main page.
  """

  use ExHubWeb, :live_view

  alias ExHub.Utils

  @exhub_server Application.get_env(:ex_hub, :exhub_server)

  # Mounts the page with empty results
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:results, %{})
     |> assign(:language, nil)}
  end

  def handle_event("search", %{"request" => %{"language" => language}}, socket) do
    send_response(socket, language)
  end

  def handle_params(%{"language" => language} = _params, _url, socket) do
    send_response(socket, language)
  end

  def handle_params(_params, _url, socket) do
    {:noreply, socket}
  end

  # Makes the request to the GenServer and assign the results to the socket
  defp send_response(socket, language) do
    {:ok, response} = apply(@exhub_server, :request, [language])
    response = Enum.map(response, fn repository -> Utils.atomify_map(repository) end)

    {:noreply,
     socket
     |> assign(:results, response)
     |> assign(:language, language)}
  end
end
