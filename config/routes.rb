Rails.application.routes.draw do

  get 'api/v1/repositories', to: 'repositories#index'

  post 'api/v1/repositories', to: 'repositories#create'
  
  root 'repositories#home'
end
