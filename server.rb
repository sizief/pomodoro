require 'sinatra'
set :root, 'build'
set :views, settings.root
set :public_folder, File.dirname(__FILE__) + '/build'
listen "#{File.dirname(__FILE__)}/tmp/sockets/puma.sock", :backlog => 64

# Set process id path
pid "#{File.dirname(__FILE__)}/tmp/pids/puma.pid"

get '/' do
  render :html, :index
end
