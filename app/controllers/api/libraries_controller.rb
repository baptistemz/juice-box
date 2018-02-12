module Api
  class LibrariesController < BaseController
    before_action :authenticate_api_user!, only: [:create, :index, :delete]

    def update
      @library = Library.find(params[:id])
      if @library.update(library_params)
        render partial: "api/librarys/library.json.jbuilder", locals: {library: @library}
      else
        render_error
      end
    end

    def show
      @library = Library.find(params[:id])
      @musics = @library.library_musics
      @artists = []
      @musics.each do |music|
        @artists << music.music.artist if music.music.artist && !@artists.include?(music.music.artist)
      end
      @playlists = current_api_user.playlists
      render :show
    end

    private

    def library_params
      params.require(:library).permit(:contributors_number, :transition_speed)
    end

    def render_error
      render json: { errors: @library.errors },
        status: :unprocessable_entity
    end
  end
end
