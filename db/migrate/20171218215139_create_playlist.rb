class CreatePlaylist < ActiveRecord::Migration[5.1]
  def change
    create_table :playlists do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.boolean :public
    end
  end
end
