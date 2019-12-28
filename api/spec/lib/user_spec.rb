# frozen_string_literal: true

require File.expand_path '../spec_helper.rb', __dir__

describe 'User' do
  let (:user) { create(:user) }
  let (:second_user) { create(:user, provider_user_id: user.provider_user_id)}
  
  it 'should create user if not exists' do
    expect(User.find(user.id).id).to eq(user.id)
  end

  context "Adding second user" do
    
    it 'should not add user if provider_user_id exists' do
      expect{second_user}.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
