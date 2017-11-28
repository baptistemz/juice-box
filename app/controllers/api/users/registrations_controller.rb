class RegistrationsController < Devise::RegistrationsController
  skip_before_filter :verify_authenticity_token, :only => :create

  # def render_create_success
  #   render json: @resource.token_validation_response ##@resource is a user instance
  # end
end
