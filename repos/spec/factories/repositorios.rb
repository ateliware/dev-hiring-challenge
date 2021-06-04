FactoryBot.define do
  factory :repositorio do
    name { Faker::Name.first_name }
    full_name { Faker::Name.name }
    language { Faker::ProgrammingLanguage.name }
    description { Faker::Hipster.sentence }
    private { Faker::Boolean.boolean(true_ratio: 0.2) }
    html_url { Faker::Internet.url }
    owner
  end
end
