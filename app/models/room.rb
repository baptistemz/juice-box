class Room < ApplicationRecord
  belongs_to :user
  has_many :room_musics, dependent: :destroy
  # has_many :invitations, dependent: :destroy
  extend FriendlyId
  friendly_id :slug
  validates_presence_of :name, :slug
  validates_uniqueness_of :slug, :name
  validates_inclusion_of :transition_speed, in: 0..20
  # validates_numericality_of :contributors_number, greater_than_or_equal_to: 0

  def broadcast_modified_list(musics)
    ActionCable.server.broadcast(self.slug, {action: "sorted", musics: ActiveSupport::JSON.decode(render_musics(musics))})
  end
end
