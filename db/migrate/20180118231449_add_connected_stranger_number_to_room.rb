class AddConnectedStrangerNumberToRoom < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :connected_stranger_number, :integer, default: 0
  end
end
