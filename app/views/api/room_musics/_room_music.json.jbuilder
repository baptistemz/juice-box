username = room_music.user_id ? room_music.user.username : "stranger"
json.extract! room_music, :id, :state, :user_id
json.extract! room_music.music, :provider, :music_key, :whole_name, :artist, :song
json.username username
