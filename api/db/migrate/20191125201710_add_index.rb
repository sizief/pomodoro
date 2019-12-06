# frozen_string_literal: true

class AddIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :access_id
  end
end
