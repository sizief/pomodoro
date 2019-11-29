require_relative './oauth'
require_relative './message'
require_relative './user'
require_relative './project'

class Pomodoro < ActiveRecord::Base
  validates_presence_of :project
  validates_presence_of :completed_at
  belongs_to :project
end
