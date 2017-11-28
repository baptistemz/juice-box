class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :slug
      t.boolean :playing
      t.integer :contributors_number
      t.references :user, foreign_key: true
    end
  end
end
