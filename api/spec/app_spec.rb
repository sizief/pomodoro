require File.expand_path '../spec_helper.rb', __FILE__
require_relative '../app.rb'

describe "App" do
  it "should response to health check" do
    get '/health-check'
    expect(last_response).to be_ok
  end
end
