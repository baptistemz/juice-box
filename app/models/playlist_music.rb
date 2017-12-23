class PlaylistMusic < ApplicationRecord
  belongs_to :music
  belongs_to :playlist
  extend Enumerize
  validates_uniqueness_of :music_id, scope: [:playlist_id], :on => [:create], message: "This music is already in the list"

  private

  def render_music(room_music)
    ApplicationController.renderer.render(partial: "api/room_musics/room_music.json.jbuilder", locals: {room_music: self})
  end
end
