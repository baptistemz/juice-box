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
      start_position = @room.room_musics.where(state: "archived").length
      RoomMusic.skip_callback(:update, :after, :broadcast_updated_music)
      params[:room_music_ids].each_with_index do |id, index|
        @room.room_musics.find(id).update(waiting_list_position: index + start_position)
      end
      RoomMusic.set_callback(:update, :after, :broadcast_updated_music)
      @room.broadcast_sorted_list(@room.room_musics.where(state: "waiting"))
      render :show
    end

    def add_playlist
      @room = Room.find(params[:room_id])
      @playlist = Playlist.find(params[:playlist_id])
      @playlist_musics = @playlist.playlist_musics.shuffle
      if @room.room_musics.length == 0
        first_music = @playlist_musics.shift
        @room.room_musics.create(state: "playing", music_id: first_music.music_id, user_id: current_api_user.id, waiting_list_position: 0)
      end
      RoomMusic.skip_callback(:create, :after, :broadcast_added_music)
      @playlist_musics.each do |playlist_music|
        @room.room_musics.create(state: "waiting", music_id: playlist_music.music_id, user_id: current_api_user.id, waiting_list_position: @room.room_musics.length)
      end
      RoomMusic.set_callback(:create, :after, :broadcast_added_music)
      @room.broadcast_added_playlist(@room.room_musics.where(state: "waiting"), @playlist, current_api_user)
      render :show
    end

    def close_channels
      RoomMusic.skip_callback(:create, :after, :broadcast_added_music)
      RoomMusic.skip_callback(:update, :after, :broadcast_updated_music)
      RoomMusic.skip_callback(:delete, :after, :broadcast_deleted_music)
    end

    # def increment_contributors_number
    #   @room = Room.friendly.find(params[:room_id])
    #   @room.update(contributors_number: @room.contributors_number + 1)
    #   render json: { contributors_number: @room.contributors_number }
    # end
    #
    # def decrement_contributors_number
    #   @room = Room.friendly.find(params[:room_id])
    #   @room.update(contributors_number: @room.contributors_number - 1)
    #   render json: { contributors_number: @room.contributors_number }
    # end

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
