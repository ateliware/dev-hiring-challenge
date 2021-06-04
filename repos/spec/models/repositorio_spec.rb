require 'rails_helper'

RSpec.describe Repositorio, type: :model do
  let(:repositorio) { create(:repositorio) }

  it 'has valid atributes' do
    expect(repositorio).to be_valid
  end

  context 'not valid when' do
    it { expect(build(:repositorio, name: nil)).to_not be_valid }
    it { expect(build(:repositorio, full_name: nil)).to_not be_valid }
  end

  it 'belongs to a owner' do
    expect(repositorio.owner).to be_kind_of(Owner)
  end

  it 'be valid when html_url matchs' do
    expect(repositorio.html_url).to match(/https?:\/\/[\S]+/)
  end
end
