require 'rails_helper'

RSpec.describe Language, type: :model do
  subject {
    described_class.new(
      name: 'Ruby',
      code: 'ruby',
    )
  }

  it 'works with valid attributes' do
    expect(subject).to be_valid
  end
  
  it 'must have a name' do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it 'must have a code' do
    subject.code = nil
    expect(subject).to_not be_valid
  end

  it 'fetches 5 valid repositories' do
    result = subject.fetch_repositories
    expect(result.length).to eq 5
  end
end