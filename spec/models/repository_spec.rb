require 'rails_helper'

RSpec.describe Repository do
  describe '#name' do
    it 'initializes correctly' do
      name = 'repo'
      repo = Repository.new(name: name)
      expect(repo.name).to eql(name)
    end
  end
end
