class UpdateColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :provider_id, :provider_user_id
  end
end
