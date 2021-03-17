Rails.application.routes.draw do
  root to: "organizations#index"

  resources :repositories, only: [:index, :create, :destroy]
  resources :organizations, param: :slug, only: [:index, :show]
end
