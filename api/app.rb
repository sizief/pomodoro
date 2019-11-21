require 'dotenv/load'
require 'sinatra'
require "sinatra/reloader" if development?

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
  p params
  #oauth_user = Oauth.new(authentication_code)
  #return Message.new(error: true, body: 'user not found').call if ouath_user.nil?
  #user = User.find(oauth_user)
  #return Message.new(error: false, body: user).call
end


