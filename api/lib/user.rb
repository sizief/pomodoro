require 'securerandom'
class User < ActiveRecord::Base
  validates_presence_of :given_name
  validates_presence_of :email
  validates_presence_of :provider_user_id
  validates :provider_user_id, uniqueness: true
  
  after_create :create_access

  private
  
  def create_access
    self.access_id = SecureRandom.hex
    self.save
  end
end
