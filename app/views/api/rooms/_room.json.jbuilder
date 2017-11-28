json.extract! room, :id, :user_id, :name, :slug, :contributors_number, :playing
if room.user
  json.owner_name room.user.username
end
