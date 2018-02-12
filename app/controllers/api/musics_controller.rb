module Api
  class MusicsController < BaseController
    before_action :authenticate_api_user!

    def update
      @library_music = LibraryMusic.find(params[:id])
      @music = @library_music.music
      if params[:artist_name]
        artist_id = Artist.where(name: params[:artist_name]).first_or_create!.id
      else
        artist_id = @music.artist_id
      end
      @music.update(song: params[:song], artist_id: artist_id)
      Rails.logger.debug("@music: #{@music.to_json}")
      render partial: "api/library_musics/library_music.json.jbuilder", locals: {library_music: @library_music}
    end

    private

    def render_error
      render json: { errors: @music.errors },
        status: :unprocessable_entity
    end
  end
end
