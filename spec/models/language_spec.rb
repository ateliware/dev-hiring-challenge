require 'rails_helper'

RSpec.describe Language, type: :model do
  subject {
    Language.new(name: "Ruby", code: "ruby")
  }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end

  describe "methods" do
    it "fetches repositories" do
      repositories = subject.fetch_repositories
      expect(repositories.length).to be > 0
    end
  end
end
