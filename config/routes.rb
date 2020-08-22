Rails.application.routes.draw do
  root to: 'home#index'
  resources :stars, only: %i[index]
end
