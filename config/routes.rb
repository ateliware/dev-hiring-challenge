Rails.application.routes.draw do
  resources :repositories do 
    collection do
      get 'fetch_data'
      get 'clear_data'
    end
  end
  get '/', to: redirect('/repositories')
  root 'repositories#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
