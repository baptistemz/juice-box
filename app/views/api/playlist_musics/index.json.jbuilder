unless @playlist_musics
  @playlist_musics = playlist_musics
end
json.array! @playlist_musics.order(:waiting_list_position), partial: 'api/playlist_musics/playlist_music', as: :playlist_music
