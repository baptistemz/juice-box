class CreateArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :artists do |t|
      t.references :library, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
