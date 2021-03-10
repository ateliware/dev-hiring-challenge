Rails.application.routes.draw do
  get 'repositories/:id', to: 'repositories#show'

  get 'languages/index'
  root 'languages#index'

  post 'languages/:id/update_repositories',
    to: 'languages#update_repositories',
    as: 'language_update'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
