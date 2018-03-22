class AddPlaylistMusicToLibraryPlayerMusics < ActiveRecord::Migration[5.1]
  def change
    add_reference :library_player_musics, :playlist_music, foreign_key: true
  end
end
