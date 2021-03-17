Rails.application.routes.draw do
  root to: "organizations#index"

  defaults format: :html do
    resources :repositories, only: [:index, :create, :destroy]
    resources :organizations, param: :slug, only: [:index, :show]

    get '/status', to: "application#status"
  end
end
