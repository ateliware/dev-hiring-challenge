require 'rails_helper'

RSpec.describe Repository do
  describe '#name' do
    it 'initializes correctly' do
      name = 'repo'
      repo = Repository.new(name)
      expect(repo.name).to be(name)
    end
  end
end
