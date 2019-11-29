require 'securerandom'
class User < ActiveRecord::Base
  validates_presence_of :given_name
  validates_presence_of :email
  validates_presence_of :provider_user_id
  validates :provider_user_id, uniqueness: true
  
  has_many :projects, dependent: :destroy
  #has_many :pomodoros, -> {}
  before_create :create_access
  after_create :create_project
  private
  
  def create_access
    self.access_id = SecureRandom.hex
  end

  def create_project
    self.projects.create(name: 'general')
  end
end
