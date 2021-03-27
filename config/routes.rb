Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'introductions#index'
  resources :introductions, only: %i[index show create]
  resources :languages, only: %i[new show create index destroy]
  get 'fetching', to: 'languages#fetch_data'
end
