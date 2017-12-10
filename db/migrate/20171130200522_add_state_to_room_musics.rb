class AddStateToRoomMusics < ActiveRecord::Migration[5.1]
  def change
    add_column :room_musics, :state, :string
  end
end
