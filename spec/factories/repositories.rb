# frozen_string_literal: true

FactoryBot.define do
  factory :repository do
    owner
    importer
    github_repo_id { 308770 }
    name { 'devise' }
    full_name { 'heartcombo/devise' }
    html_url { 'https://github.com/heartcombo/devise' }
    language { 'Ruby' }
    description { 'Flexible authentication solution for Rails with Warden.' }
    stargazers_count { 21368 }
    watchers_count { 21368 }
    forks_count { 5153 }
    open_issues_count { 118 }
    score { 1 }

    trait :rand do
      github_repo_id { rand(0..9_999_999) }
      stargazers_count { rand(0..99_999) }
      watchers_count { rand(0..99_999) }
      forks_count { rand(0..99_999) }
      open_issues_count { rand(0..99_999) }
      score { rand(1..10) }
    end
  end
end
