require 'rails_helper'

RSpec.describe Repository, type: :model do
  let(:repository1) { create(:repository) }

  it "Should be valid" do
    expect(repository1).to be_valid
  end

  it "Should be invalid, name is nil" do
    repository2 = build(:repository, name: nil) 
    expect(repository2).to_not be_valid
  end

  it "Should be invalid, name exists" do
    repository2 = build(:repository, name: repository1.name) 
    expect(repository2).to_not be_valid
  end

  it "Should be invalid, language is nil" do
    repository2 = build(:repository, language: nil) 
    expect(repository2).to_not be_valid
  end
end
