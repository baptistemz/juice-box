# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from params["room_id"]
    @room = Room.find(params["room_id"])
    if params["user_id"]
      @room.connections.first_or_create(user_id: params["user_id"])
    else
      @room.update(connected_stranger_number: @room.connected_stranger_number + 1)
    end
  end

  def unsubscribed
    @room = Room.find(params["room_id"])
    if params["user_id"]
      @room.connections.where(user_id: params["user_id"]).destroy_all
      @room.update(connected_stranger_number: 0) if !@room.connections.any?
    else
      @room.update(connected_stranger_number: @room.connected_stranger_number - 1)
    end
  end
end
