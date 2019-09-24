require 'sinatra'
set :root, 'build'
set :views, settings.root
set :public_folder, File.dirname(__FILE__) + '/build'


get '/' do
  render :html, :index
end
