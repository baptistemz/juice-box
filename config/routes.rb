Rails.application.routes.draw do
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth'
    get 'authcheck/whoami'
    get 'authcheck/checkme'
    resources :rooms, only: [:create, :index, :show, :update] do
      resources :room_musics, only: [:create, :index, :update, :destroy]
      post 'change_order', to: 'rooms#change_order'
    end
    resources :playlists, only: [:create, :index, :show, :update] do
      resources :playlist_musics, only: [:create, :index, :update, :destroy]
      post 'change_order', to: 'playlists#change_order'
    end
  end
  get '/404' => 'react_app#index'
  get '/*path' => 'react_app#index'
end
