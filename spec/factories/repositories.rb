FactoryBot.define do
  factory :repository do
    sequence(:github_id) { |i| i }
    sequence(:name) { |i| "Repository ##{i}" }
    description { "Description" }
    creation_date { "2020-05-19 06:53:49" }
    language { "Ruby" }
    forks_count { 1 }
    stargazers_count { 1 }
    open_issues_count { 1 }
  end
end
