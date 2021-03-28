Rails.application.routes.draw do
  devise_for :users
  root to: "repositories#index"

  resources :repositories, only: %i[index]
  resources :starred_repositories, only: %i[create]
end
