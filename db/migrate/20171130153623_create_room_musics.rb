class CreateRoomMusics < ActiveRecord::Migration[5.1]
  def change
    create_table :room_musics do |t|
      t.references :room, foreign_key: true
      t.references :music, foreign_key: true
    end
  end
end
