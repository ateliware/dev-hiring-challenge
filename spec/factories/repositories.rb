FactoryBot.define do
  factory :repository do
    name              { Faker::Space.galaxy }
    owner             { Faker::Company.name }
    html_url          { "https://github.com/#{:name}/#{:owner}" }
    description       { Faker::Lorem.sentence }
    create_date       { Faker::Date.between(from: 10.days.ago, to: 5.days.ago) }
    update_date       { Faker::Date.between(from: 4.days.ago,  to: Date.today) }
    stargazers_count  { Faker::Number.between(from: 1, to: 1000) }
    forks_count       { Faker::Number.between(from: 1, to: 1000) }
    open_issues_count { Faker::Number.between(from: 1, to: 1000) }
    language_id       { nil }
  end
end