require 'json'

module Api
  class PlaylistMusicsController < BaseController
    def create
      @playlist = Playlist.find(params[:playlist_id])
      @music = Music.where(
        artist: params[:artist],
        song: params[:song],
        whole_name: params[:whole_name],
        provider: params[:provider],
        music_key: params[:music_key]
      ).first_or_create!
      @playlist_music = @playlist.playlist_musics.build(music_id: @music.id, waiting_list_position: @playlist.playlist_musics.length)
      if @playlist_music.save
        Rails.logger.debug("@playlist_music:#{@playlist_music.to_json}")
        render partial: "api/playlist_musics/playlist_music.json.jbuilder", locals: {playlist_music: @playlist_music}
      else
        render_error
      end
    end

    def index
      @playlist_musics = Playlist.find(params[:playlist_id]).playlist_musics
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
