Rails.application.routes.draw do
  root "languages#index"
  resources :repositories, only: [:show]
  resources :languages, param: :slug, only: [:show, :index]
  get 'results', to: 'results#index'
end
