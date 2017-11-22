module Api
  class AuthcheckController < BaseController
    before_action :authenticate_api_user!, only: [:checkme]
    def whoami
      render json: current_api_user || {}
    end
    def checkme
      render json: current_api_user || {}
    end
  end
end