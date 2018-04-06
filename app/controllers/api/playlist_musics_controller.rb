require 'json'

module Api
  class PlaylistMusicsController < BaseController
    def create
      @playlist = Playlist.find(params[:playlist_id])
      Rails.logger.debug("params[:artist].class : #{params[:artist].class}")
      Rails.logger.debug("params[:artist] : #{params[:artist]}")
      artist_id = params[:artist].class == String ? Artist.where(name: params[:artist]).first_or_create!.id : params[:artist][:id]
      Rails.logger.debug("artist_id : #{artist_id}")
      @music = Music.where(
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!(
        artist_id: artist_id,
        song: params[:song],
        whole_name: params[:whole_name]
      )
      @playlist_music = @playlist.playlist_musics.build(music_id: @music.id)
      if @playlist_music.save
        Rails.logger.debug("@playlist_music:#{@playlist_music.to_json}")
        @playlist_musics = @playlist.playlist_musics
        render :index
        # render partial: "api/playlist_musics/playlist_music.json.jbuilder", locals: {playlist_music: @playlist_music}
      else
        render_error
      end
    end

    def index
      @playlist = Playlist.find(params[:playlist_id])
      @playlist_musics = @playlist.playlist_musics
    end

    def update
      Rails.logger.debug("playlist_music_params: #{playlist_music_params}")
      @playlist = Playlist.find(params[:playlist_id])
      @playlist_music = @playlist.playlist_musics.find(params[:id])
      if @playlist_music.update(playlist_music_params)
        render partial: "api/playlist_musics/playlist_music.json.jbuilder", locals: {playlist_music: @playlist_music}
      else
        render_error
      end
    end

    def destroy
      @playlist = Playlist.find(params[:playlist_id])
      @playlist_music = @playlist.playlist_musics.find(params[:id])
      @playlist_music.destroy
      render partial: "api/playlist_musics/playlist_music.json.jbuilder", locals: {playlist_music: @playlist_music}
    end

    private

    def playlist_music_params
      params.require(:playlist_music).permit(:id, :playlist_id, :music_id)
    end

    def render_error
      render json: { errors: @playlist_music.errors },
        status: :unprocessable_entity
    end
  end
end
