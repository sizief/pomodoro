class PomodoroPresenter
  def initialize(user)
    @user= user
  end

  def call
    Pomodoro.includes(:project).where(project_id: user.projects)
    .map{|pomodoro| {
      id: pomodoro.id,
      project_name: pomodoro.project.name,
      date: pomodoro.created_at,
    }}
  end

  private
  attr_reader :user
end
