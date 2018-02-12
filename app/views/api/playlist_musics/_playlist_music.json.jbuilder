json.extract! playlist_music, :id
json.playlist playlist_music.playlist, :id, :name
json.extract! playlist_music.music, :provider, :music_key, :whole_name, :artist, :song
