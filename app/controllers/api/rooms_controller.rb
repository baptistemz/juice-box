module Api
  class RoomsController < BaseController
    before_action :authenticate_api_user!, only: [:create, :index, :delete]
    def create
      @room = current_api_user.rooms.create(room_params)
      if @room.save
        @is_owner = current_api_user ? current_api_user.id == @room.user_id : false
        render :show, status: :created
      else
        render_error
      end
    end

    def index
      @contributor_rooms = []
      @owner_rooms = current_api_user.rooms
      render :index
    end

    def show
      @room = Room.friendly.find(params[:id])
      @is_owner = current_api_user ? current_api_user.id == @room.user_id : false
      render :show
    end

    def delete
    end

    def increment_contributors_number
      @room = Room.friendly.find(params[:room_id])
      @room.update(contributors_number: @room.contributors_number + 1)
      render json: { contributors_number: @room.contributors_number }
    end

    def decrement_contributors_number
      @room = Room.friendly.find(params[:room_id])
      @room.update(contributors_number: @room.contributors_number - 1)
      render json: { contributors_number: @room.contributors_number }
    end

    private

    def room_params
      params.require(:room).permit(:name, :slug, :contributors_number)
    end

    def render_error
      render json: { errors: @room.errors },
        status: :unprocessable_entity
    end
  end
end
