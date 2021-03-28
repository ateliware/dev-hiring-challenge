Rails.application.routes.draw do
  devise_for :users
  root to: "repositories#index"

  resources :repositories, only: %i[index]
end
