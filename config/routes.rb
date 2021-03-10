Rails.application.routes.draw do
  get 'languages/index'
  root 'languages#index'

  get 'repositories/:id', to: 'repositories#show'

  post 'languages/:id/update_repositories',
    to: 'languages#update_repositories',
    as: 'language_update'
end
