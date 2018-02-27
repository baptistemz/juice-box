json.extract! library_player_music, :id, :status
json.extract! library_player_music.music, :provider, :music_key, :whole_name, :song
json.artist library_player_music.music.artist , :id, :name
