class Room < ApplicationRecord
  belongs_to :user
  has_many :room_musics, dependent: :destroy
  has_many :contributions, dependent: :destroy
  has_many :connections, dependent: :destroy
  # has_many :invitations, dependent: :destroy
  extend FriendlyId
  friendly_id :slug
  validates_presence_of :name, :slug
  validates_uniqueness_of :slug, :name
  validates_inclusion_of :transition_speed, in: 1..30
  validates_numericality_of :connected_stranger_number, greater_than_or_equal_to: 0 
  before_save :broadcast_connected_stranger_number_changed, if: :connected_stranger_number_changed?

  def broadcast_sorted_list(room_musics)
    ActionCable.server.broadcast(
      self.id,
      {action: "sorted", musics: ActiveSupport::JSON.decode(render_room_musics(room_musics))}
    )
  end

  def broadcast_added_playlist(room_musics, playlist, user)
    Rails.logger.debug("room_musics: #{room_musics}")
    ActionCable.server.broadcast(
      self.id,
      {action: "added_playlist", musics: ActiveSupport::JSON.decode(render_room_musics(room_musics)),
      name: playlist.name,
      id: playlist.id,
      user: user.username}
    )
  end

  def broadcast_connected_stranger_number_changed
    ActionCable.server.broadcast(
      self.id, {action: "connected_stranger_number_changed", number: self.connected_stranger_number}
    )
  end

  private
  def render_room_musics(room_musics)
    Rails.logger.debug("room_musics: #{room_musics}")
    ApplicationController.renderer.render(template: "api/room_musics/index.json.jbuilder", locals: { room_musics: room_musics })
  end
end
