require 'rails_helper'

RSpec.describe Language, type: :model do
  let!(:language) { create(:language) }

  describe "associations" do
    it { should have_many(:repositories).dependent(:destroy) }
  end

  describe "validations" do
    it "works with valid attributes" do
      expect(language).to be_valid
    end

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:code) }
  end

  describe "methods" do
    it "fetches 5 valid repositories" do
      result, status = language.fetch_repositories
      expect(result.length).to eq 5
      expect(status).to eq 'ok'
    end

    it "must have a code compatible with github's API" do
      language.code = 'invalid'
      result, status = language.fetch_repositories
      expect(result.length).to eq 0
      expect(status).to eq 'unprocessable_entity'
    end
  end
end