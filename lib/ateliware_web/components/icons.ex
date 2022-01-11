defmodule AteliwareWeb.Components.Icons do
  @moduledoc false
  use Phoenix.Component

  def code(assigns) do
    ~H"""
    <svg xmlns="http://www.w3.org/2000/svg" class={"h-5 w-5 #{assigns[:class]}"} viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
    """
  end

  def collapse_arrow(%{collapsed?: collapsed?} = assigns) do
    ~H"""
      <svg xmlns="http://www.w3.org/2000/svg" class={"#{assigns[:class]} #{get_animation_class(collapsed?)}"} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /> </svg>
    """
  end

  defp get_animation_class(true), do: "collapse-close"
  defp get_animation_class(false), do: "collapse-open"
end
