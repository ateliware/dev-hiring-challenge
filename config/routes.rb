Rails.application.routes.draw do
  root 'home#index'
  post 'search', to: 'home#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
