unless @playlist_musics
  @playlist_musics = playlist_musics
end
unless @playlist
  @playlist = playlist
end
json.playlist_musics @playlist_musics.order(:waiting_list_position), partial: 'api/playlist_musics/playlist_music', as: :playlist_music
json.playlist @playlist
