Rails.application.routes.draw do
  namespace :admin do
        resources :admins
      end
  root 'admin/dashboard#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
