module Api
  class RoomsController < BaseController
    before_action :authenticate_api_user!, only: [:create, :index, :delete]
    def create
      @room = current_api_user.rooms.create(room_params)
      if @room.save
        @is_owner = current_api_user ? current_api_user.id == @room.user_id : false
        render :show, status: :created
      else
        render_error
      end
    end

    def index
      @contributor_rooms = []
      @owner_rooms = current_api_user.rooms
      render :index
    end

    def update
      @room = Room.find(params[:id])
      if @room.update(room_params)
        @is_owner = current_api_user ? current_api_user.id == @room.user_id : false
        render partial: "api/rooms/room.json.jbuilder", locals: {room: @room, is_owner: @is_owner}
      else
        render_error
      end
    end

    def show
      @room = Room.friendly.find(params[:id])
      @is_owner = current_api_user ? current_api_user.id == @room.user_id : false
      render :show
    end

    def delete
    end

    def change_order
      @room = Room.find(params[:room_id])
      RoomMusic.skip_callback(:update, :after, :broadcast_updated_music)
      params[:room_music_ids].each_with_index do |id, index|
        @room.room_musics.find(id).update(waiting_list_position: index)
      end
      RoomMusic.set_callback(:update, :after, :broadcast_updated_music)
      @room.broadcast_modified_list(@room.room_musics.where(state: "waiting"))
      render :show
    end

    def increment_contributors_number
      @room = Room.friendly.find(params[:room_id])
      @room.update(contributors_number: @room.contributors_number + 1)
      render json: { contributors_number: @room.contributors_number }
    end

    def decrement_contributors_number
      @room = Room.friendly.find(params[:room_id])
      @room.update(contributors_number: @room.contributors_number - 1)
      render json: { contributors_number: @room.contributors_number }
    end

    private

    def room_params
      params.require(:room).permit(:name, :slug, :contributors_number, :transition_speed)
    end

    def render_error
      render json: { errors: @room.errors },
        status: :unprocessable_entity
    end
  end
end
