class AddAllowPasswordChangeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :persist_allow_password_change, :boolean, default: false
  end
end
