# frozen_string_literal: true

class CreatePomodoro < ActiveRecord::Migration[6.0]
  def change
    create_table :pomodoros do |t|
      t.references :project
      t.timestamp :start
      t.timestamp :end
      t.timestamps
    end
  end
end
