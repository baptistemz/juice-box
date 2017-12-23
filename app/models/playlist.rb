class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlist_musics, dependent: :destroy
end
