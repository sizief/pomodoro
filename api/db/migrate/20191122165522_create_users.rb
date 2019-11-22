class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :given_name
      t.string :family_name
      t.string :email
      t.string :picture
      t.string :provider_id
      t.string :provider
      t.timestamps
    end
  end
end
