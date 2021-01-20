# frozen_string_literal: true

FactoryBot.define do
  factory :importer do
    response { { a: 'b', c: 'd', e: 'f' } }
  end
end
