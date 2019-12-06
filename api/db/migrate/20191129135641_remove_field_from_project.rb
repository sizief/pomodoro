# frozen_string_literal: true

class RemoveFieldFromProject < ActiveRecord::Migration[6.0]
  def change
    remove_column :projects, :estimated_complementation
  end
end
