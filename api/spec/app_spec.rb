# frozen_string_literal: true

require File.expand_path 'spec_helper.rb', __dir__

describe 'App' do
  it 'should response to health check' do
    get '/health-check'
    expect(last_response).to be_ok
  end

  it 'should get error if param is not exist' do
    post '/users', { token: 1 }.to_json, 'CONTENT_TYPE' => 'application/json'
    expect(last_response.status).to eq(400)
  end

  # it "should get user info if user is exist" do
  #   post '/users', {token_id: 1}.to_json, "CONTENT_TYPE" => "application/json"
  #   expect(last_response).to be_ok?
  #   body_espected = {error: true, boddy: "user is not exists"}
  #   last_response.body.should eq(body_espected)
  # end
end
