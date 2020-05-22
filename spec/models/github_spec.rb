require 'rails_helper'

RSpec.describe Github do
  describe '#user' do
    it 'returns status 200' do
      github = Github.new
      response = github.user
      expect(response.code).to be(200)
    end
  end

  describe '#repositories' do
    it 'returns status 200' do
      github = Github.new
      response = github.search_repositories('language:ruby')
      expect(response.code).to be(200)
    end
  end
end
