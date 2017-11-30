class Music < ApplicationRecord
  has_many :room_musics, dependent: :destroy
  extend Enumerize
  enumerize :provider, in: ["youtube", "spotify", "deezer", "soundcloud"]
  validates_presence_of :music_key, :provider
end
