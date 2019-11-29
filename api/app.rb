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

# Create user or find user
# == Parameters:
#  authentication_code <strign>
#
# == Returns
#  user <User>
post '/users' do
  payload = JSON.parse(request.body.read)
  
  if payload['token_id'].nil?
    status 400
    return Message.new(
      error: true, 
      body: 'token_id is not provided'
    ).json
  end

  # Get user profile from Google
  oauth_user = Oauth.new(payload['token_id']).call

  if oauth_user.error?
    status 400
    return oauth_user.json
  end
  
  status 200
  user = User.find_or_create_by(oauth_user.body)
  user.to_json
rescue JSON::ParserError
  status 401
  "Payload is not a valid JSON"
end

# Create pomodoro
# == Header
#  authurization <String>
# == Parameters:
#  topic <String>
#  start <Timestamp>
#  end <Timestamp>
#
post '/pomodoros' do
  @user.to_json
end

# Create user or find user
# == Header
#  authurization <String>
# == Parameters:
#
# == Returns
#  Array<Pomodoro> 
get '/pomodoros' do
  'success'
end

get '/health-check' do
  "ok"
end
