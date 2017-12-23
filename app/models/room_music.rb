class RoomMusic < ApplicationRecord
  belongs_to :music
  belongs_to :room
  belongs_to :user, required: false
  extend Enumerize
  after_create :broadcast_added_music
  after_update :broadcast_updated_music
  after_update :broadcast_updated_music
  after_destroy :broadcast_deleted_music
  validates_uniqueness_of :music_id, scope: [:room_id], conditions: -> { where.not(state: 'archived') }, :on => [:create], message: "This music is already in the list"
  # validate :only_one_music_playing
  # after_destroy :broadcast_deleted_music
  enumerize :state, in: ["waiting", "playing", "archived"]


  def broadcast_added_music
    ActionCable.server.broadcast(self.room.id, {action: "added", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  def broadcast_updated_music
    ActionCable.server.broadcast(self.room.id, {action: "updated", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  def broadcast_deleted_music
    ActionCable.server.broadcast(self.room.id, {action: "deleted", music: ActiveSupport::JSON.decode(render_music(self))})
  end

  private

  def only_one_music_playing
    errors.add(:password, "two songs are playing in the same time") if state == "playing" && Room.find(room_id).room_musics.where(state: "playing").any?
  end

  def render_music(room_music)
    ApplicationController.renderer.render(partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: self})
  end
end
