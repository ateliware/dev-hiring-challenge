Rails.application.routes.draw do
  resources :repositories, only: [:index, :show]
  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
