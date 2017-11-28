module Api
  module Users
    class PasswordsController < DeviseTokenAuth::PasswordsController
      def edit
        super
        @resource.update!(persistent_allow_password_change: true)
      end

      def update
        super
        @resource.update!(persistent_allow_password_change: false)
      end

       protected

       def resource_update_method
         @resource.allow_password_change = @resource.persistent_allow_password_change
         super
       end
    end
  end
end
