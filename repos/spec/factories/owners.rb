FactoryBot.define do
  factory :owner do
    id { Faker::Number.number(digits: 5) }
    login { Faker::Internet.username }
    avatar_url { Faker::Internet.url }
    html_url { Faker::Internet.url }
  end
end
