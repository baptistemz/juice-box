class AddWaitingListPositionToRoomMusics < ActiveRecord::Migration[5.1]
  def change
    add_column :room_musics, :waiting_list_position, :integer
  end
end
