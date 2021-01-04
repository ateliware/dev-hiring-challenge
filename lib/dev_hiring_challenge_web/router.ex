defmodule DevHiringChallengeWeb.Router do
  use DevHiringChallengeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DevHiringChallengeWeb do
    pipe_through :browser

    get "/", RepositoryController, :index

    resources "/repositories", RepositoryController, only: [:index, :create, :delete]
    get "/favorites", RepositoryController, :favorites
  end
end
