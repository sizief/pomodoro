require 'dotenv/load'
require 'sinatra'
require "sinatra/reloader" if development?
require "sinatra/activerecord"
require_relative './lib/pomodoro'

before do
  headers 'Access-Control-Allow-Origin' => '*'
  # Answer following routes even if AUTH is not available
  pass if ['/users','/health-check'].include? request.path_info
  halt 401 if request.env['HTTP_AUTHORIZATION'].nil?
  @user = User.find_by(access_id: request.env['HTTP_AUTHORIZATION'])
  halt 401 if @user.nil?
end

helpers do
  def permit(params, allowed)
    params.each { |k,v| params.delete(k) unless allowed.include? k }
  end
end

# == Parameters:
#  token_id <strign>
#
# == Returns
#  user <User>
post '/users' do
  payload = permit(JSON.parse(request.body.read, {symbolize_names: true}),  [:token_id])
  halt 400, 'token_id is not provided' if payload[:token_id].nil?

  # Get user profile from Google
  oauth_user = Oauth.new(payload[:token_id]).call
  halt 400, oauth_user.body if oauth_user.error?

  User.find_or_create_by(oauth_user.body).to_json
rescue JSON::ParserError
  halt 400, "Payload is not a valid JSON"
end

# == Header
#  authurization <String>
# == Parameters:
#  name <String>
#  estimated_pomodoro <Integer>
post '/projects' do
  payload = permit(
    JSON.parse(
      request.body.read ,
      {symbolize_names: true}
    ), [:name, :estimated_pomodoro]
  )
  project = @user.projects.create(payload)
  halt 200 if project.persisted?
  halt 400, project.errors.messages.to_json
rescue JSON::ParserError
  halt 400, "Payload is not a valid JSON"
end

# == Header
#  authurization <String>
# == Returns
#  Array<Project> 
get '/projects' do
  @user.projects.select(:id,:name,:color).to_json
end

# == Header
#  authurization <String>
# == Parameters:
#  project_id <String>
#  completed_at <Date> 2019-12-20
post '/pomodoros' do
  payload = permit(
    JSON.parse(
      request.body.read ,
      {symbolize_names: true}
    ), [:project_id, :completed_at]
  )
  
  halt 400, 'project_id is not provided' if payload[:project_id].nil?
  
  pomodoro = @user.projects.find(payload[:project_id]).pomodoros.create(payload)
  halt 200 if pomodoro.persisted?
  halt 400, pomodoro.errors.messages.to_json
rescue JSON::ParserError
  halt 400, "Payload is not a valid JSON"
rescue ActiveRecord::RecordNotFound
  halt 400, 'project does not exists'
end

# == Header
#  authurization <String>
# == Returns
#  Array<Pomodoro> 
get '/pomodoros' do
  result = {}
  @user.projects.collect(&:pomodoros).first.each do |pmd|
    date_key = pmd.completed_at.to_s.to_sym
    result[date_key] = {} unless result.key?(date_key)
    project_key = pmd.project_id.to_s.to_sym
    count = result[date_key].key?(project_key) ? result[date_key][project_key]+1 : 1
    result[date_key][project_key] =  count
  end
  result.to_json
end

get '/health-check' do
  "ok"
end
