module Api
  class RoomMusicsController < BaseController
    def create
      @music = Music.where(
        artist: params[:artist],
        song: params[:song],
        whole_name: params[:whole_name],
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!
      @room_music = Room.find(params[:room_id]).room_musics.create( music_id: @music.id)
      if @room_music.save
        render :show, status: :created
      else
        render_error
      end
    end

    def index

    end

    def delete
    end

    private

    def render_error
      render json: { errors: @room_music.errors },
        status: :unprocessable_entity
    end
  end
end
