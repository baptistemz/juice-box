class CreateMusics < ActiveRecord::Migration[5.1]
  def change
    create_table :musics do |t|
      t.string :artist
      t.string :song
      t.string :whole_name
      t.string :provider
      t.string :music_id
    end
  end
end
