# frozen_string_literal: true

FactoryBot.define do
  factory :starred_repository do
    user
    repository
  end
end
