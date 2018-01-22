class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :room
  after_create :broadcast_new_connection
  after_destroy :broadcast_deleted_connection
  validates_uniqueness_of :user_id, scope: :room_id

  def broadcast_new_connection
    Rails.logger.debug("broadcast_new_connection, self.user.username #{self.user.username}")
    ActionCable.server.broadcast(self.room.id, {action: "new_connection", user: ActiveSupport::JSON.decode(render_connection(self))})
  end

  def broadcast_deleted_connection
    Rails.logger.debug("broadcast_deleted_connection, self.user.username #{self.user.username}")
    ActionCable.server.broadcast(self.room.id, {action: "deleted_connection", user: ActiveSupport::JSON.decode(render_connection(self))})
  end

  private

  def render_connection(connection)
    ApplicationController.renderer.render(partial: "api/connections/connection.json.jbuilder", locals: {connection: connection})
  end
end
