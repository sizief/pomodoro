# frozen_string_literal: true

require 'rack/test'
require 'rspec'
require 'vcr'
require 'factory_bot'
require 'database_cleaner'

ENV['RACK_ENV'] ||= 'test'
ENV['APP_ENV'] ||= 'test'

require File.expand_path '../app.rb', __dir__
require File.expand_path '../lib/pomodoro.rb', __dir__

module RSpecMixin
  include Rack::Test::Methods
  def app
    Sinatra::Application
  end
end

RSpec.configure do |config|
  config.include RSpecMixin
  config.include FactoryBot::Syntax::Methods

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
    FactoryBot.find_definitions
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end

VCR.configure do |config|
  config.cassette_library_dir = 'fixtures/vcr_cassettes'
  config.hook_into :webmock
end
