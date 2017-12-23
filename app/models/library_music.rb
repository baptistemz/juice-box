class LibraryMusic < ApplicationRecord
  belongs_to :music
  belongs_to :library
  extend Enumerize
  validates_uniqueness_of :music_id, scope: [:library_id], conditions: -> { where.not(state: 'archived') }, :on => [:create], message: "This music is already in the list"
  enumerize :state, in: ["waiting", "playing", "archived"]
end
