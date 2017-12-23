class Library < ApplicationRecord
  belongs_to :user
  has_many :library_musics, dependent: :destroy
  validates_inclusion_of :transition_speed, in: 0..20
end
