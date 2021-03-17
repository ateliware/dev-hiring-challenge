Rails.application.routes.draw do
  root to: "organizations#index"

  resources :repositories, only: [:index, :create, :destroy], xhr: true
  resources :organizations, param: :slug, only: [:index, :show], xhr: true
end
