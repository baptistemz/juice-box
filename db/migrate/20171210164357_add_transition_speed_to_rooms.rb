class AddTransitionSpeedToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :transition_speed, :integer, default: 10
  end
end
