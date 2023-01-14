Rails.application.routes.draw do
  root "languages#index"
  resources :repositories
  resources :languages, param: :slug
  get 'results', to: 'results#index'
end
