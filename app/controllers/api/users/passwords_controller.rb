module Api
  module Users
    class PasswordsController < DeviseTokenAuth::PasswordsController
      def edit
        @resource = resource_class.reset_password_by_token({
          reset_password_token: resource_params[:reset_password_token]
        })

        if @resource && @resource.id
          client_id  = SecureRandom.urlsafe_base64(nil, false)
          token      = SecureRandom.urlsafe_base64(nil, false)
          token_hash = BCrypt::Password.create(token)
          expiry     = (Time.now + DeviseTokenAuth.token_lifespan).to_i

          @resource.tokens[client_id] = {
            token:  token_hash,
            expiry: expiry
          }

          # ensure that user is confirmed
          @resource.skip_confirmation! if @resource.devise_modules.include?(:confirmable) && !@resource.confirmed_at

          # allow user to change password once without current_password
          @resource.update!(persist_allow_password_change: true);
          Rails.logger.debug("1 @resource.username:#{@resource.username}")
          @resource.save!
          yield @resource if block_given?

          redirect_to(@resource.build_auth_url(params[:redirect_url], {
            token:          token,
            client_id:      client_id,
            reset_password: true,
            config:         params[:config]
          }))
        else
          render_edit_error
        end
      end

      def update
        # make sure user is authorized
        unless @resource
          return render_update_error_unauthorized
        end

        # make sure account doesn't use oauth2 provider
        unless @resource.provider == 'email'
          return render_update_error_password_not_required
        end

        # ensure that password params were sent
        unless password_resource_params[:password] && password_resource_params[:password_confirmation]
          return render_update_error_missing_password
        end
        Rails.logger.debug("2 @resource.username:#{@resource.username}")
        if @resource.send(resource_update_method, password_resource_params)
          @resource.update!(persist_allow_password_change: false);

          yield @resource if block_given?
          return render_update_success
        else
          return render_update_error
        end
      end

      protected

      def resource_update_method
        Rails.logger.debug("3 @resource.username: #{@resource.username}")
        if @resource.persist_allow_password_change == true
          "update_attributes"
        else
          "update_with_password"
        end
      end

      def render_create_error_missing_email
        render json: {
          success: false,
          errors: [I18n.t("devise_token_auth.passwords.missing_email")]
        }, status: 401
      end

      def render_create_error_missing_redirect_url
        render json: {
          success: false,
          errors: [I18n.t("devise_token_auth.passwords.missing_redirect_url")]
        }, status: 401
      end

      def render_create_error_not_allowed_redirect_url
        render json: {
          status: 'error',
          data:   resource_data,
          errors: [I18n.t("devise_token_auth.passwords.not_allowed_redirect_url", redirect_url: @redirect_url)]
        }, status: 422
      end

      def render_create_success
        render json: {
          success: true,
          message: I18n.t("devise_token_auth.passwords.sended", email: @email)
        }
      end

      def render_create_error
        render json: {
          success: false,
          errors: @errors,
        }, status: @error_status
      end

      def render_edit_error
        raise ActionController::RoutingError.new('Not Found')
      end

      def render_update_error_unauthorized
        render json: {
          success: false,
          errors: ['Unauthorized']
        }, status: 401
      end

      def render_update_error_password_not_required
        render json: {
          success: false,
          errors: [I18n.t("devise_token_auth.passwords.password_not_required", provider: @resource.provider.humanize)]
        }, status: 422
      end

      def render_update_error_missing_password
        render json: {
          success: false,
          errors: [I18n.t("devise_token_auth.passwords.missing_passwords")]
        }, status: 422
      end

      def render_update_success
        render json: {
          success: true,
          data: resource_data,
          message: I18n.t("devise_token_auth.passwords.successfully_updated")
        }
      end

      def render_update_error
        return render json: {
          success: false,
          errors: resource_errors
        }, status: 422
      end

      private

      def resource_params
        params.permit(:email, :password, :password_confirmation, :current_password, :reset_password_token, :redirect_url, :config)
      end

      def password_resource_params
        params.permit(*params_for_resource(:account_update))
      end
    end
  end
end
