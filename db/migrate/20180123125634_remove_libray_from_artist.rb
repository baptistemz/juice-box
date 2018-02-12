class RemoveLibrayFromArtist < ActiveRecord::Migration[5.1]
  def change
    remove_reference :artists, :library, foreign_key: true
  end
end
