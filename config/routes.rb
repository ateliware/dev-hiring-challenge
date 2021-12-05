Rails.application.routes.draw do
  root 'repos#index'

  resources :repos, only: %i[ index new show ]
end
