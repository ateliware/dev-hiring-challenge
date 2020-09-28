Rails.application.routes.draw do
  root 'repositories#index'
  resources :repositories
  get 'repositories_sample' => 'repositories#sample', :as => :repositories_sample
  mount PgHero::Engine, at: "pghero"
end
