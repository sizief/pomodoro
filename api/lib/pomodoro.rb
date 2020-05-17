# frozen_string_literal: true

require_relative './oauth'
require_relative './message'
require_relative './user'
require_relative './project'
require_relative './pomodoro_presenter'

class Pomodoro < ActiveRecord::Base
  validates_presence_of :project
  belongs_to :project
end
