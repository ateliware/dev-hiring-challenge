require 'rails_helper'

RSpec.describe Repository, type: :request do
  subject { Github::Repositories.new('stars', 1, 1, 'ruby') }

  describe '#github' do
    it 'returns true if service respond with any repository' do
      response = subject.send
      expect(response['items'].any?).to eq(true)
    end
  end

end