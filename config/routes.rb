Rails.application.routes.draw do
  root 'repositories#index'

  resources :repositories, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
