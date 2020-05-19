require 'rails_helper'

RSpec.describe Repository do
  it '#name' do
    name = 'repo'
    repo = Repository.new(name)
    expect(repo.name).to be(name)
  end
end
