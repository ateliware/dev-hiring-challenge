require 'rails_helper'

RSpec.describe Repository, type: :model do
  let!(:language) { create(:language) }
  let!(:repository) { create(:repository, language_id: language.id) }

  describe "associations" do
    it { should belong_to(:language) } 
  end

  describe "validations" do
    it "works with valid attributes" do
      expect(repository).to be_valid
    end

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:owner) }
    it { should validate_presence_of(:html_url) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:create_date) }
    it { should validate_presence_of(:update_date) }
    it { should validate_presence_of(:stargazers_count) }
    it { should validate_presence_of(:forks_count) }
    it { should validate_presence_of(:open_issues_count) }

    it "must have an update_date greater than create_date" do
      repository.create_date = Date.today + 1
      repository.update_date = Date.today
      expect(repository).to_not be_valid
    end

    it "must have a valid github url as html_url" do
      repository.html_url = 'http://example.com/owner/repository'
      expect(repository).to_not be_valid

      repository.html_url = 'https://github.com/owner'
      expect(repository).to_not be_valid

      repository.html_url = 'http://github.com/owner/repository/extra'
      expect(repository).to_not be_valid
    end
  end
end
