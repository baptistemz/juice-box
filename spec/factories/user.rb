FactoryBot.define do
  factory :user do
    username Faker::Name.first_name
    email Faker::Internet.email
    password Faker::Internet.password(8)
  end
end
