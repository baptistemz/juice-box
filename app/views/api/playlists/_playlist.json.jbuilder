json.extract! playlist, :id, :user_id, :name
json.owner_name playlist.user.username
music_keys = []
playlist.playlist_musics.each{ |pm| music_keys << pm.music.music_key }
json.music_keys music_keys
