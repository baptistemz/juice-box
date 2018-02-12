class ReplaceArtistByArtistIdInMusic < ActiveRecord::Migration[5.1]
  def self.up
    remove_column :musics, :artist, :string
    add_reference :musics, :artist, index: true
  end

  def self.down
    add_column :musics, :artist, :string
    remove_reference :musics, :artist, index: true
  end
end
