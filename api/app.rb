#!/usr/bin/env ruby
# frozen_string_literal: true
require 'pry'
require 'date'
require 'dotenv/load'
Dotenv.load("#{__dir__}/.env")
require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require_relative './lib/pomodoro'

before do
  headers 'Access-Control-Allow-Origin' => '*'

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
#  completed_at <Date> 2019-12-20
post '/pomodoros' do
  payload = permit(
    JSON.parse(
      request.body.read,
      symbolize_names: true
    ), %i[project_id completed_at]
  )

  halt 400, 'project_id is not provided' if payload[:project_id].nil?
  if payload[:project_id] == 'default'
    payload[:project_id] = @user.projects.first.id
  end
  pomodoro = @user.projects.find(
               payload[:project_id]
             ).pomodoros.create(payload)
  halt 200 if pomodoro.persisted?
  halt 400, pomodoro.errors.messages.to_json
rescue JSON::ParserError
  halt 400, 'Payload is not a valid JSON'
rescue ActiveRecord::RecordNotFound
  halt 400, 'project does not exists'
end

# == Header
#  authurization <String>
# == Returns
#  Array<Pomodoro>
get '/pomodoros' do
  result = {pomodoros: [], projects: []}
  (-7..0).each do |offset|
    date = Date.today+offset
    item = {}
    item[:completed_at] = date
    Pomodoro.where(project_id: @user.projects).where(completed_at: date).each do |pmd| 
      project_key = pmd.project.name.to_sym
      item[project_key] = item.key?(project_key) ? item[project_key]+1 : 1
      item["#{pmd.project.name}Color".to_sym] = 'hsl(228, 70%, 50%)' #pmd.project.color
    end
    result[:pomodoros].push item
  end
  result[:projects] = @user.projects.map(&:name)
  result.to_json
end

get '/health-check' do
  'ok'
end
