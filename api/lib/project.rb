# frozen_string_literal: true

class Project < ActiveRecord::Base
  validates_presence_of :name
  #TODO: check name for valid chars
  validates_presence_of :user
  validates :name, uniqueness: true
  belongs_to :user
  has_many :pomodoros, dependent: :destroy
  before_create :set_color
  before_destroy :can_destroy?

  DEFAULT_PROJECT = 'general'

  private

  def can_destroy?
    raise('Can not delete default project') if self.name == DEFAULT_PROJECT
  end

  def set_color
    self.color = pick_color
  end

  def pick_color
    used_colors = user.projects.pluck(:color).uniq
    random_color = colors[rand(colors.size)]
    return random_color if used_colors.size >= colors.size
    return random_color unless used_colors.include? random_color

    pick_color
  end

  def colors
    %w[26547c 067bc2 fff8f0 ff522b e8ac20]
  end
end
