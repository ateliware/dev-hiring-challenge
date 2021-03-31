FactoryBot.define do
  factory :repository do
    name { Faker::DcComics.villain }
    owner_avatar { Faker::Avatar.image }
    description { Faker::GreekPhilosophers.quote }
    html_url { Faker::Internet.url }
    home_page { Faker::Internet.url }
    stargazers_count { Faker::Number.number(digits: 5) }
    language
  end
end
