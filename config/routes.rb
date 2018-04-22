Rails.application.routes.draw do
  namespace :admin do
    resources :movements, :wods
  end

  resources :users do
    resources :usermovements, :userwods
  end

  get "/sessions/new", to: "sessions#new"
  post "/sessions/create", to: "sessions#create"
  delete "/sessions/destroy", to: "sessions#destroy"

  get "auth/facebook/callback", to: "sessions#create"
  get "auth/failure", to: redirect("/")
  root "application#welcome"
end
