# frozen_string_literal: true

FactoryBot.define do
  factory :owner do
    login { 'python' }
    avatar_url { 'https://avatars3.githubusercontent.com/u/1525981?v=4' }
    html_url { 'https://github.com/python' }
  end
end
