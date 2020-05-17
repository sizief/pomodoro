class DropCompletedAt < ActiveRecord::Migration[6.0]
  def change
    remove_column :pomodoros, :completed_at
  end
end
