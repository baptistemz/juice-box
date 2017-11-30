class ChangeMusicIdInMusicKey < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :musics, :music_id, :music_key
  end

  def self.down
    rename_column :musics, :music_key, :music_id
  end
end
