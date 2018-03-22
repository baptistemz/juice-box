module Api
  class LibraryPlayerMusicsController < BaseController
    before_action :authenticate_api_user!

    def create
      @library = Library.find(params[:library_id])
      @playing_library_player_musics = @library.library_player_musics.where(status: "playing")
      @playing_library_player_musics.first.destroy if @playing_library_player_musics.any?
      Rails.logger.debug("params: #{params.to_json}")
      if params[:artist].class == String
        artist_id = Artist.where(name: params[:artist]).first_or_create!.id
      elsif params[:artist].class == Hash
        artist_id = params[:artist][:id]
      else
        artist_id = Artist.where(name: params[:whole_name].split("-").first).first_or_create!.id
      end
      @music = Music.where(
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!(
        artist_id: artist_id,
        song: params[:song],
        whole_name: params[:whole_name]
      )
      @library_player_music = @library.library_player_musics.build(
        music_id: @music.id,
        status: "playing",
        library_music_id: params[:from] === "library" ? params[:id] : nil,
        playlist_music_id: params[:from] === "playlist" ? params[:id] : nil
      )
      if @library_player_music.save
        render partial: "api/library_player_musics/library_player_music.json.jbuilder", locals: {library_player_music: @library_player_music}
      else
        render_error
      end
    end

    def destroy
      @library = Library.find(params[:library_id])
      @library_player_music = @library.library_player_musics.find(params[:id])
      @library_player_music.destroy
      render partial: "api/library_player_musics/library_player_music.json.jbuilder", locals: {library_player_music: @library_player_music}
    end

    def delete_all
      @library = Library.find(params[:library_id])
      @library_player_musics = @library.library_player_musics
      @library_player_musics.destroy_all
      render
    end


    private

    def library_player_music_params
      params.require(:library_player_music).permit(:id, :library_id, :music_id)
    end

    def render_error
      render json: { errors: @library_player_music.errors },
        status: :unprocessable_entity
    end
  end
end
