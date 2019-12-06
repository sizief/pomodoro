# frozen_string_literal: true

class AddAccess < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :access_id, :string
  end
end
