require 'rails_helper'

RSpec.describe Owner, type: :model do
  let(:owner) { create(:owner) }
  let(:repositorio) { create(:repositorio, owner: owner) }

  it 'should be valid with correct params' do
    expect(owner).to be_valid
  end

  # just using override instead trait
  it { expect(build(:owner, avatar_url: nil)).to_not be_valid }

  it 'is valid when html_url matchs' do
    expect(owner.html_url).to match(/https?:\/\/[\S]+/)
  end

  it 'is valid when avatar_url matchs' do
    expect(owner.avatar_url).to match(/https?:\/\/[\S]+/)
  end

  it 'has at least one repositorio' do
    repositorio = create(:repositorio, owner: owner)
    expect(owner).to eq(repositorio.owner)
    expect(owner.repositorios.size).to be >= 1
  end
end
