require 'rails_helper'

RSpec.describe Owner, type: :model do
  it "factory should be valid" do
    owner = FactoryBot.build(:owner)
    expect(owner).to be_valid
    expect(owner.save).to be true
  end
end
