FactoryBot.define do
  factory :repository do
    name { "MyString" }
    owner_avatar { "MyString" }
    description { "MyString" }
    html_url { "MyString" }
    home_page { "MyString" }
    stargazers_count { 1 }
    language { nil }
  end
end
