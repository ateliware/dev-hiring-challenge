Rails.application.routes.draw do

  resources :languages, only: [:index]
  resources :repositories, only: [:index]
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
