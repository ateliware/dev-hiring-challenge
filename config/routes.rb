Rails.application.routes.draw do
  root 'home#index'
  get '/ruby', action: 'ruby', controller: 'home'
  get '/python', action: 'python', controller: 'home'
  get '/elixir', action: 'elixir', controller: 'home'
  get '/nodejs', action: 'nodejs', controller: 'home'
  get '/aspnet', action: 'aspnet', controller: 'home'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
