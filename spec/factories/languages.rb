FactoryBot.define do
  factory :language do
    name { Faker::ProgrammingLanguage.name }
  end
end
