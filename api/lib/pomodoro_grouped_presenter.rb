class PomodoroGroupedPresenter
  def initialize(user, max_days)
    @user= user
    @max_days = max_days
  end

  def call
    result = {pomodoros: [], projects: []}
    (-@max_days..0).each do |offset|
      date = Date.today+offset
      item = {}
      item[:created_at] = date.strftime("%a %d")
      Pomodoro.where(project_id: @user.projects)
      .where(created_at: date.beginning_of_day..date.end_of_day).each do |pmd| 
        project_key = pmd.project.name.to_sym
        item[project_key] = item.key?(project_key) ? item[project_key]+1 : 1
        item["#{pmd.project.name}Color".to_sym] = 'hsl(228, 70%, 50%)' #pmd.project.color
      end
      result[:pomodoros].push item
    end
    result[:projects] = @user.projects.map(&:name)
    result
  end
end
