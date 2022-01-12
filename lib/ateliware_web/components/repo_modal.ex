defmodule AteliwareWeb.Components.RepoModal do
  @moduledoc false

  use Phoenix.Component
  import AteliwareWeb.Components.Modal
  alias Phoenix.LiveView.JS

  def render(assigns) do
    ~H"""
    <.modal id="modal-test" click_away={JS.push("close_modal")} show={@show_modal}>
      <:header>
        <div class="w-full flex items-center justify-between transition-all">
          <a class="text-lg hover:text-primary " href={@repo_details.html_url} target="_blank">
            <%= @repo_details.full_name %>
          </a>
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" phx-click="close_modal" class="h-6 w-6 cursor-ponter" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </:header>
      <div class="text-center p-5 flex-auto justify-center">
        <%= if @repo_details.homepage do %>
          <div class="flex items-center justify-between mt-6 ">
            <h4>Homepage:</h4>
            <a href={@repo_details.homepage} target="_blank" class="flex items-center hover:text-primary">
              <small class="text-sm"><%= @repo_details.homepage %></small>
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        <% end %>
        <div class="flex items-center justify-between mt-7 ">
          <h4>Stars:</h4>
          <div class="flex items-center">
            <%= @repo_details.stargazers_count %>
            <div class="text-yellow-500 ml-5"><AteliwareWeb.Components.Icons.star /></div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-7 ">
          <h4>Forks:</h4>
          <div class="flex items-center">
            <%= @repo_details.forks %>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 h-5 w-5" data-name="Layer 1" viewBox="0 0 24 24"><path d="M17,6.06a3,3,0,0,0-1.15,5.77A2,2,0,0,1,14,13.06H10a3.91,3.91,0,0,0-2,.56V7.88a3,3,0,1,0-2,0v8.36a3,3,0,1,0,2.16.05A2,2,0,0,1,10,15.06h4a4,4,0,0,0,3.91-3.16A3,3,0,0,0,17,6.06Zm-10-2a1,1,0,1,1-1,1A1,1,0,0,1,7,4.06Zm0,16a1,1,0,1,1,1-1A1,1,0,0,1,7,20.06Zm10-10a1,1,0,1,1,1-1A1,1,0,0,1,17,10.06Z"/></svg>
          </div>
        </div>
        <div class="flex items-center justify-between mt-7 ">
          <h4>Watchers:</h4>
          <div class="flex items-center">
            <%= @repo_details.watchers %>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </.modal>
    """
  end
end
