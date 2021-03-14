require 'rails_helper'

RSpec.describe Language, type: :model do
  subject {
    described_class.new(
      name: 'Ruby',
      code: 'ruby',
    )
  }

  it "works with valid attributes" do
    expect(subject).to be_valid
  end

  it { should have_many(:repositories).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:code) }

  it "fetches 5 valid repositories" do
    result, status = subject.fetch_repositories
    expect(result.length).to eq 5
    expect(status).to eq 'ok'
  end

  it "must have a code compatible with github's API" do
    subject.code = 'invalid'
    result, status = subject.fetch_repositories
    expect(result.length).to eq 0
    expect(status).to eq 'unprocessable_entity'
  end
end