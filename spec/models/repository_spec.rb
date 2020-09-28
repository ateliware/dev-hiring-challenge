require 'rails_helper'

RSpec.describe Repository, type: :model do
  subject { Repository.new }

  describe '#create' do
    it 'returns true if whether repository class exists' do
      expect(subject).to be_kind_of(described_class)
    end
  end

  describe '#save' do
    it 'returns true if repository is created and saved' do
      example = rand(1000).to_s
      repository = described_class.new(uid: example.to_i, name: example, avatar_url: example, watchers_count: example.to_i, description: example, url: example)
      expect(repository.save).to eq(true)
    end
  end

end
