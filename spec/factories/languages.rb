# frozen_string_literal: true

FactoryBot.define do
  factory :language do
    name { Faker::Name.name }
  end
end
