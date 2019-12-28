FactoryBot.define do
  factory :user do
    given_name { "John" }
    family_name  { "Doe" }
    email { "JohnDoe@gmail.com" }
    provider { 'Google' }
    provider_user_id { '123456789' }
    picture { nil }
    access_id { nil }
  end
end
