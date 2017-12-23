class CreateLibrary < ActiveRecord::Migration[5.1]
  def change
    create_table :libraries do |t|
      t.references :user, foreign_key: true
    end
  end
end
