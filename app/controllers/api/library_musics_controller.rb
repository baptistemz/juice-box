module Api
  class LibraryMusicsController < BaseController
    def create
      @library = Library.find(params[:library_id])
      Rails.logger.debug("params[:song] : #{params[:song]}")
      artist_id = params[:artist].class == String ? Artist.where(name: params[:artist]).first_or_create!.id : params[:artist][:id]
      @music = Music.where(
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!(
        artist_id: artist_id,
        song: params[:song],
        whole_name: params[:whole_name]
      )
      @library_music = @library.library_musics.build(music_id: @music.id)
      if @library_music.save
        Rails.logger.debug("@library_music:#{@library_music.to_json}")
        render partial: "api/library_musics/library_music.json.jbuilder", locals: {library_music: @library_music}
      else
        render_error
      end
    end

    def index

    end

    def destroy
      @library = Library.find(params[:library_id])
      @library_music = @library.library_musics.find(params[:id])
      @library_music.destroy
      render partial: "api/library_musics/library_music.json.jbuilder", locals: {library_music: @library_music}
    end

    private

    def library_music_params
      params.require(:library_music).permit(:id, :library_id, :music_id)
    end

    def render_error
      render json: { errors: @library_music.errors },
        status: :unprocessable_entity
    end
  end
end
