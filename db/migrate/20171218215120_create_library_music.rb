class CreateLibraryMusic < ActiveRecord::Migration[5.1]
  def change
    create_table :library_musics do |t|
      t.references :library, foreign_key: true
      t.references :music, foreign_key: true
      t.string :state
      t.integer :waiting_list_position
    end
  end
end
