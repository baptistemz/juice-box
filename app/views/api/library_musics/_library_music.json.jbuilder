json.extract! library_music, :id, :state
json.extract! library_music.music, :provider, :music_key, :whole_name, :song
json.artist library_music.music.artist , :id, :name
# json.playlist_ids library_music.music.playlist_musics.pluck(:playlist_id)
