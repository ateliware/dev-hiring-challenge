defmodule GhTopReposWeb.ErrorViewTest do
  use GhTopReposWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.html" do
    assert render_to_string(GhTopReposWeb.ErrorView,
                            "404.html", []) =~ " <p>Resource not found</p>"
  end

  test "renders 500.html" do
    assert render_to_string(GhTopReposWeb.ErrorView,
                            "500.html", []) =~ "<p>Internal server error</p>"
  end
end
