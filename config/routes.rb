Rails.application.routes.draw do
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: { passwords: 'api/users/passwords' }
    get 'authcheck/whoami'
    get 'authcheck/checkme'
    resources :rooms, only: [:create, :index, :show, :update] do
      resources :room_musics, only: [:create, :index, :update, :destroy]
      post 'change_order', to: 'rooms#change_order'
      post 'add_playlist', to: 'rooms#add_playlist'
    end
    resources :libraries, only: [ :show, :update] do
      resources :library_musics, only: [:create, :destroy]
      resources :library_player_musics, only: [:create, :destroy]
    end
    resources :artists, only: [ :update ]
    resources :musics, only: [ :update ]
    resources :playlists, only: [:create, :index, :show, :update] do
      resources :playlist_musics, only: [:create, :index, :update, :destroy]
      post 'change_order', to: 'playlists#change_order'
    end
  end
  get '/404' => 'react_app#index'
  get '/*path' => 'react_app#index'
end
