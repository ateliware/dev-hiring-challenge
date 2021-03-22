require 'rails_helper'

RSpec.describe Repository, type: :model do
  subject {
    Repository.new(
      name: 'rails',
      owner_name: 'rails',
      owner_avatar_url: 'https://avatars.githubusercontent.com/u/4223?v=4',
      html_url: 'https://github.com/rails/rails',
      description: 'Ruby on Rails',
      github_create: '2008-04-11 02:19:47',
      github_update: '2021-03-20 02:17:18',
      stargazers_count: 47809,
      forks_count: 19210,
      open_issues_count: 665,
      watchers_count: 47809,
      language: Language.new(id:1, name: "Ruby", code: "ruby")
    )
  }              

  describe "validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end
