defmodule FiveLanguagesWeb.Router do
  use FiveLanguagesWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", FiveLanguagesWeb do
    pipe_through :browser

    get "/", PageController, :index
    resources "/repositories", RepositoryController
  end
end
