class LibraryPlayerMusic < ApplicationRecord
  belongs_to :library
  belongs_to :library_music, required: false
  belongs_to :music
  extend Enumerize
  enumerize :status, in: ["waiting", "playing", "ending"]
end
