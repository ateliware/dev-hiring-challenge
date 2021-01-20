Rails.application.routes.draw do
  root to: 'repositories#index'
  resources :repositories, only: %i[index show]
  resources :importers, only: [:create]
end
