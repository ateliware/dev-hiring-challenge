require 'rails_helper'

RSpec.describe Language, type: :model do
  let(:language1) { create(:language) }

  it "Should be valid" do
    expect(language1).to be_valid
  end

  it "Should be invalid, name is nil" do
    language2 = build(:language, name: nil) 
    expect(language2).to_not be_valid
  end

  it "Should be invalid, name exists" do
    language2 = build(:language, name: language1.name) 
    expect(language2).to_not be_valid
  end
end
