#!/usr/bin/env ruby
# frozen_string_literal: true
require 'pry'
require 'date'
require 'dotenv/load'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require_relative './lib/pomodoro'
set :bind, '0.0.0.0'

before do
  headers 'Access-Control-Allow-Origin' => ENV['HOST']

  # Answer following routes even if AUTH is not available
  pass if ['/users', '/health-check'].include? request.path_info
  pass if request.env['REQUEST_METHOD'] == 'OPTIONS'

  halt 401 if request.env['HTTP_AUTHORIZATION'].nil?

  @user = User.find_by(access_id: request.env['HTTP_AUTHORIZATION'])
  halt 401 if @user.nil?
end

options '*' do
  headers 'Allow' => 'GET, PUT, POST, DELETE, OPTIONS'
  headers 'Access-Control-Allow-Methods' => 'GET, PUT, POST, DELETE, OPTIONS'
  headers 'Access-Control-Allow-Headers' => 'Authorization, Content-Type, Accept'
  200
end

helpers do
  def permit(params, allowed)
    params.each { |k, _v| params.delete(k) unless allowed.include? k }
  end
end

# == Parameters:
#  token_id <strign>
#
# == Returns
#  user <User>
post '/users' do
  payload = permit(
    JSON.parse(
      request.body.read, 
      symbolize_names: true
     ), [:token_id])
  halt 400, 'token_id is not provided' if payload[:token_id].nil?

  # Get user profile from Google
  oauth_user = Oauth.new(payload[:token_id]).call
  halt 400, oauth_user.body if oauth_user.error?

  User.find_or_create_by(oauth_user.body).to_json
rescue JSON::ParserError
  halt 400, 'Payload is not a valid JSON'
end

# == Header
#  authurization <String>
# == Parameters:
#  name <String>
#  estimated_pomodoro <Integer>
post '/projects' do
  payload = permit(
    JSON.parse(
      request.body.read,
      symbolize_names: true
    ), %i[name estimated_pomodoro]
  )
  project = @user.projects.create(payload)
  halt 200 if project.persisted?
  halt 400, project.errors.messages.to_json
rescue JSON::ParserError
  halt 400, 'Payload is not a valid JSON'
end

# == Header
#  authurization <String>
# == Returns
#  Array<Project>
get '/projects' do
  @user.projects.select(:id, :name, :color).to_json
end

# == Header
#  authurization <String>
delete '/projects/:id' do
  project = @user.projects.find(params[:id])
  project.destroy
rescue => e
  halt 400, e.to_json
end

# == Header
#  authurization <String>
# == Parameters:
#  project_id <String>
post '/pomodoros' do
  payload = permit(
    JSON.parse(
      request.body.read,
      symbolize_names: true
    ), %i[project_id]
  )

  halt 400, 'project_id is not provided' if payload[:project_id].nil?
  pomodoro = @user.projects.find(
               payload[:project_id]
             ).pomodoros.create(payload)
  halt 200 if pomodoro.persisted?
  halt 400, pomodoro.errors.messages.to_json
rescue JSON::ParserError
  halt 400, 'Payload is not a valid JSON'
rescue ActiveRecord::RecordNotFound
  halt 400, 'project is not exists'
end

# == Header
#  authurization <String>
# == Returns
#  Array<Pomodoro>
get '/pomodoros' do
  max_number_of_pomodoros = 10
  PomodoroPresenter.new(@user).call[0..max_number_of_pomodoros].to_json
end

# == Header
#  authurization <String>
# == Returns
#  Array<{created_at: Date, project_name: number of pomodoro, project_color: color_string }>
get '/pomodoros_grouped' do
  max_number_of_days = 21
  PomodoroGroupedPresenter.new(@user, max_number_of_days).call.to_json
end

get '/health-check' do
  {server_up: true, database_connection: User.count>=0}.to_json
rescue PG::ConnectionBad
  {server_up: true, database_connection: false}.to_json
end
