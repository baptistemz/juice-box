Rails.application.routes.draw do
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth'
    get 'authcheck/whoami'
    get 'authcheck/checkme'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
