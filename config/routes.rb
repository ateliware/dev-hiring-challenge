Rails
  .application
  .routes
  .draw do
    root 'sessions#new'
    resources :users, only: %i[new create]
    resources :repositories
    get 'login', to: 'sessions#new'
    post 'login', to: 'sessions#create'
    get 'logout', to: 'sessions#destroy', as: 'logout'
    get 'repositories/index'
    get 'welcome/index'
    get 'repositories_api', to: 'repositories#search'
    get 'repositories_api_search', to: 'repositories#results_api'
    delete '/repositories', to: 'repositories#destroy'
  end
