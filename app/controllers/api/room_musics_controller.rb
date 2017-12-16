require 'json'

module Api
  class RoomMusicsController < BaseController
    def create
      @room = Room.find(params[:room_id])
      state = @room.room_musics.where(state: "playing").any? ? "waiting" : "playing"
      @user_id = current_api_user ? current_api_user.id : nil
      @music = Music.where(
        artist: params[:artist],
        song: params[:song],
        whole_name: params[:whole_name],
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!
      @room_music = @room.room_musics.build(state: state, music_id: @music.id, user_id: @user_id, waiting_list_position: @room.room_musics.length)
      if @room_music.save
        Rails.logger.debug("@room_music:#{@room_music.to_json}")
        render partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: @room_music}
      else
        render_error
      end
    end

    def index

    end

    def update
      Rails.logger.debug("room_music_params: #{room_music_params}")
      @room = Room.find(params[:room_id])
      @room_music = @room.room_musics.find(params[:id])
      if @room_music.update(room_music_params)
        render partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: @room_music}
      else
        render_error
      end
    end

    def delete
    end

    private

    def room_music_params
      params.require(:room_music).permit(:id, :room_id, :music_id, :state, :user_id)
    end

    def render_error
      render json: { errors: @room_music.errors },
        status: :unprocessable_entity
    end
  end
end
