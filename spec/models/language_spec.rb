require 'rails_helper'

RSpec.describe Language, type: :model do
  let(:language1) { create(:language) }

  it "Should be valid" do
    expect(language1).to be_valid
  end 
end
