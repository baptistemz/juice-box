module Api
  class ArtistsController < BaseController
    before_action :authenticate_api_user!

    def update
      @artist = Artist.where(name: params[:name]).first
      if @artist
        @musics = Music.where(artist_id: params[:id]).each{|m| m.update!(artist_id: @artist.id)}
        @deleted_artist = Artist.find(params[:id]).destroy
      else
        @artist = Artist.find(params[:id])
        @artist.update(name: params[:name])
        @musics = []
        @deleted_artist = nil
      end
      Rails.logger.debug("@artist: #{@artist}")
      render :show
    end

    private

    def render_error
      render json: { errors: @artist.errors },
        status: :unprocessable_entity
    end
  end
end
