module Api
  class PlaylistsController < BaseController
    before_action :authenticate_api_user!, only: [:create, :index, :delete]
    def create
      @playlist = current_api_user.playlists.create(playlist_params)
      if @playlist.save
        render :show, status: :created
      else
        render_error
      end
    end

    def index
      @public_playlists = Playlist.where(public: true)
      @owner_playlists = current_api_user.playlists
      render :index
    end

    def update
      @playlist = Playlist.find(params[:id])
      if @playlist.update(playlist_params)
        render partial: "api/playlists/playlist.json.jbuilder", locals: {playlist: @playlist, is_owner: @is_owner}
      else
        render_error
      end
    end

    def show
      @playlist = Playlist.friendly.find(params[:id])
      @is_owner = current_api_user ? current_api_user.id == @playlist.user_id : false
      render :show
    end

    def delete
    end

    def change_order
      @playlist = Playlist.find(params[:playlist_id])
      start_position = @playlist.playlist_musics.where(state: "archived")
      params[:playlist_music_ids].each_with_index do |id, index|
        @playlist.playlist_musics.find(id).update(waiting_list_position: index + start_position)
      end
      @playlist.broadcast_modified_list(@playlist.playlist_musics.where(state: "waiting"))
      render :show
    end

    private

    def playlist_params
      params.require(:playlist).permit(:name)
    end

    def render_error
      render json: { errors: @playlist.errors },
        status: :unprocessable_entity
    end
  end
end
