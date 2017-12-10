class AddUserToRoomMusics < ActiveRecord::Migration[5.1]
  def change
    add_reference :room_musics, :user, index: true
  end
end
