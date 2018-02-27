class LibraryMusic < ApplicationRecord
  belongs_to :music
  belongs_to :library
  validates_uniqueness_of :music_id, scope: [:library_id], :on => [:create], message: "This music is already in the library"
end
