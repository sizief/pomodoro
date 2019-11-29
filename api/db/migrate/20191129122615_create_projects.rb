class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.references :user
      t.string :name
      t.integer :estimated_pomodoro
      t.timestamp :estimated_complementation
      t.string :color
      t.timestamps
    end
  end
end
