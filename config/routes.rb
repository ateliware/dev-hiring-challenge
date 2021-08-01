Rails.application.routes.draw do
  get 'repositories/index'
  get 'repositories/show'
  get 'repositories/new'
  
  root "repositories#index"
  get "/repository", to: "repository#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
