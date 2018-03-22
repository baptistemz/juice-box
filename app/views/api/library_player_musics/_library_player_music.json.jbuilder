json.extract! library_player_music, :id, :status, :library_music_id, :playlist_music_id
json.extract! library_player_music.music, :provider, :music_key, :whole_name, :song
json.artist library_player_music.music.artist , :id, :name
