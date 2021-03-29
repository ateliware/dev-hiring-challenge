# frozen_string_literal: true

FactoryBot.define do
  factory :repository do
    external_id { Faker::Number.unique.number(digits: 7) }
    full_name { "owner/repo" }
    description { "A description" }
    language
    url { Faker::Internet.url }
  end
end
