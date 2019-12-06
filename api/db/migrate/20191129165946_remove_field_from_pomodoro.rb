# frozen_string_literal: true

class RemoveFieldFromPomodoro < ActiveRecord::Migration[6.0]
  def change
    remove_column :pomodoros, :start
    remove_column :pomodoros, :end
    add_column :pomodoros, :completed_at, :date
  end
end
