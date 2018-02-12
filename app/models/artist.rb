class Artist < ApplicationRecord
  belongs_to :library, required: false
  has_many :musics
  validates_uniqueness_of :name
end
