class CreateLibraryPlayerMusics < ActiveRecord::Migration[5.1]
  def change
    create_table :library_player_musics do |t|
      t.references :library, foreign_key: true
      t.references :library_music, foreign_key: true
      t.references :music, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
