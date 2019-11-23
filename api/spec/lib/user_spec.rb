require File.expand_path '../../spec_helper.rb', __FILE__

describe "User" do
  let(:user_info) {
    { 
      given_name: 'Ali',
      family_name: 'Deishidi',
      provider_user_id: rand(0...9999),
      provider: 'google',
      email: 'john@doe.com',
      picture: 'http://myimage.com'
    }
  }

  it "should create user if not exists" do
    user = User.create(user_info)
    p user.errors
    expect(User.find(user.id).id).to eq(user.id)
  end
  
  it "should not add user if provider_id exists" do
    user_one = User.new(user_info).save
    user_two = User.new(user_info).save
    expect(user_two).to be_falsey
  end
  
end
