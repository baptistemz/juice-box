Rails.logger.debug("room_musics: #{room_musics}")
unless @room_musics
  @room_musics = room_musics
end
json.array! @room_musics.where.not(status: "archived").order(:waiting_list_position), partial: 'api/room_musics/room_music', as: :room_music
