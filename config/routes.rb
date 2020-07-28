Rails.application.routes.draw do
  get '/', to: 'searches#index', as: :home
  post '/search', to: 'searches#show'
  resources :searches, only: [:new, :create]
  # post '/create', to: 'searches#create'
end
