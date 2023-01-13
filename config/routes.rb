Rails.application.routes.draw do
  resources :repositories
  resources :languages, param: :slug
  get 'results', to: 'results#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
