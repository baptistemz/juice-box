class Library < ApplicationRecord
  belongs_to :user
  has_many :library_musics, dependent: :destroy
  has_many :library_player_musics, dependent: :destroy
  has_many :artists, dependent: :nullify
end
