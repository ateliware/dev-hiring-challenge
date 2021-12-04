Rails.application.routes.draw do
  root 'repos#index'
  get 'repos/new'
end
