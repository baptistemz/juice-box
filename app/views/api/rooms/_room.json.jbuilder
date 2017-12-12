json.extract! room, :id, :user_id, :name, :slug, :contributors_number, :playing, :transition_speed
if room.user
  json.owner_name room.user.username
else
  json.owner_name ""
end
if defined?(is_owner)
  json.is_owner is_owner
end
