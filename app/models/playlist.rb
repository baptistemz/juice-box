class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlist_musics, dependent: :destroy
  validates_uniqueness_of :name
end
