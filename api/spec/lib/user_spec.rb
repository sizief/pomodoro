require File.expand_path '../../spec_helper.rb', __FILE__

describe "User" do
  let(:user_info) {
      given_name: 'Ali',
      family_name: 'Deishidi',
      provider_id: '1',
      provider: 'google',
      email: 'john@doe.com',
      picyure: 'http://myimage.com'
  }

  it "should create user if not exists" do
    user = User.new(user_info).save
    expect(User.find(user.id).id).to eq(user.id)
  end
  
  it "should not add user if provider_id exists" do
    user_one = User.new(user_info).save
    user_two = User.new(user_info).save
    expect(User.find(user_one.id).id).to eq(User.find(user_two).id)
  end
  
  it "should get user from Oauth data" do
    user = User.new(user_info).save
    expect(User.find_by_oauth(user_info).id).to eq(user.id)
  end
end
