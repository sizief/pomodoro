require 'dotenv/load'
require 'sinatra'
require "sinatra/reloader" if development?
require "sinatra/activerecord"
require_relative './lib/pomodoro'

get '/health-check' do
  "ok"
end

# Create user or find user
# == Parameters:
#  authentication_code
#
# == Returns
#  User 
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
  User.find_by_oauth(oauth_user).json
end


