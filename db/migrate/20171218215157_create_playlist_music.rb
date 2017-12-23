class CreatePlaylistMusic < ActiveRecord::Migration[5.1]
  def change
    create_table :playlist_musics do |t|
      t.references :playlist, foreign_key: true
      t.references :music, foreign_key: true
      t.integer :waiting_list_position
    end
  end
end
