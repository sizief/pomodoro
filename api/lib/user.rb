class User < ActiveRecord::Base
  validates_presence_of :given_name
  validates_presence_of :email
  validates_presence_of :provider_user_id
  validates :provider_user_id, uniqueness: true 
end
