json.extract! @room, :id, :user_id, :name, :slug, :contributors_number, :playing, :transition_speed, :connected_stranger_number
if @room.user
  json.owner_name @room.user.username
end
json.musics @room.room_musics.where.not(state: "archived").order(:waiting_list_position), partial: 'api/room_musics/room_music', as: :room_music
@connections = []
@room.connections.each{|c| @connections << c.user}
json.connections @connections
json.is_owner @is_owner
