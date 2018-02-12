class Music < ApplicationRecord
  has_many :room_musics, dependent: :destroy
  has_many :library_musics, dependent: :destroy
  has_many :playlist_musics, dependent: :destroy
  belongs_to :artist
  extend Enumerize
  enumerize :provider, in: ["youtube", "spotify", "deezer", "soundcloud"]
  validates_presence_of :music_key, :provider, :artist_id
end
