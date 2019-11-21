require 'dotenv/load'
require 'sinatra'
require "sinatra/reloader" if development?
require_relative './lib/oauth'
require_relative './lib/message'

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

  oauth_user = Oauth.new(payload['token_id']).call

  if oauth_user.error?
    status 400
    return oauth_user.json
  end

  #user = User.find(oauth_user)
  status 200
  oauth_user.json
end


