Rails.application.routes.draw do
  resources :topics
  get '/repos/search', to: 'repos#search', as: 'repos_search'
  resources :repos
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'repos#index'
end
