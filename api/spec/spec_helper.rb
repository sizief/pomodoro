# frozen_string_literal: true

require 'rack/test'
require 'rspec'
require 'vcr'

ENV['RACK_ENV'] = 'test'

require File.expand_path '../app.rb', __dir__
require File.expand_path '../lib/pomodoro.rb', __dir__

module RSpecMixin
  include Rack::Test::Methods
  def app
    Sinatra::Application
  end
end

RSpec.configure { |c| c.include RSpecMixin }

VCR.configure do |config|
  config.cassette_library_dir = 'fixtures/vcr_cassettes'
  config.hook_into :webmock
end
