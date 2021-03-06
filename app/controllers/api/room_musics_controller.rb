require 'json'

module Api
  class RoomMusicsController < BaseController
    def create
      @room = Room.find(params[:room_id])
      status = @room.room_musics.where(status: "playing").any? ? "waiting" : "playing"
      @user_id = current_api_user ? current_api_user.id : nil
      if @user_id && @user_id != @room.user_id
        @room.contributions.find_or_create_by(user_id: @user_id)
      end
      artist_id = params[:artist].class == String ? Artist.where(name: params[:artist]).first_or_create!.id : params[:artist][:id]
      @music = Music.where(
        artist_id: artist_id,
        song: params[:song],
        whole_name: params[:whole_name],
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!
      @room_music = @room.room_musics.build(status: status, music_id: @music.id, user_id: @user_id, waiting_list_position: @room.room_musics.length)
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
      @room = Room.find(params[:room_id])
      @playing = @room.room_musics.where(status: "playing")
      if room_music_params["status"] == "playing" && @playing.any?
        RoomMusic.skip_callback(:update, :after, :broadcast_updated_music)
        Rails.logger.debug("room_music_params['status']: #{room_music_params["status"]}")
        Rails.logger.debug("@playing.first: #{@playing.first}")
        @ending = @room.room_musics.where(status: "ending")
        if @ending.any?
          Rails.logger.debug("@ending.length: #{@ending.length}")
          @ending.each{|e| e.update(status: "archived")}
          Rails.logger.debug("@ending.length: #{@ending.length}")
        end
        @playing.first.update(status: "ending")
        RoomMusic.set_callback(:update, :after, :broadcast_updated_music)
      end
      @room_music = @room.room_musics.find(params[:id])
      if @room_music.update(room_music_params)
        render partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: @room_music}
      else
        render_error
      end
    end

    def destroy
      @room = Room.find(params[:room_id])
      @room_music = @room.room_musics.find(params[:id])
      @room_music.destroy
      render partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: @room_music}
    end

    private

    def room_music_params
      params.require(:room_music).permit(:id, :room_id, :music_id, :status, :user_id)
    end

    def render_error
      render json: { errors: @room_music.errors },
        status: :unprocessable_entity
    end
  end
end
