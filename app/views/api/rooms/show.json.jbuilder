json.extract! @room, :id, :user_id, :name, :slug, :contributors_number, :playing, :transition_speed
if @room.user
  json.owner_name @room.user.username
end
json.musics @room.room_musics.where.not(state: "archived").order(:waiting_list_position), partial: 'api/room_musics/room_music', as: :room_music
json.is_owner @is_owner
