require 'rails_helper'

RSpec.describe Repository, type: :model do
  it "factory should be valid" do
    repository = FactoryBot.build(:repository)
    expect(repository).to be_valid
    expect(repository.save).to be true
  end

  it "belongs to owner" do
    owner = FactoryBot.create(:owner)

    repository = FactoryBot.create(:repository, owner: owner)

    expect(repository.owner).to eql(owner)

    owner.reload

    expect(owner.repositories).to be_present

    expect(owner.repositories.count).to eql(1)
    expect(owner.repositories.first).to eql(repository)
  end
end
