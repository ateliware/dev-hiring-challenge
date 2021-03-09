Rails.application.routes.draw do
  get 'languages/index'
  root 'languages#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
