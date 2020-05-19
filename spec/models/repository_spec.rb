require 'rails_helper'

RSpec.describe Repository, type: :model do
  it "factory should be valid" do
    repository = FactoryBot.build(:repository)
    expect(repository).to be_valid
    expect(repository.save).to be true
  end
end
