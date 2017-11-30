class RoomMusic < ApplicationRecord
  belongs_to :music
  belongs_to :room
end
