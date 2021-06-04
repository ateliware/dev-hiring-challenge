require 'rails_helper'

describe 'ApiGithub' do
  before do
    stub_const('API_URL', Figaro.env.api_url)
  end
  subject(:response) { RestClient.get(API_URL, params: {q: 'language:ruby'}) }
  context 'is valid when' do
    it 'receives repositories by lang' do
      expect(response.headers[:content_type]).to match(/application\/json/)
    end
    it 'receives items within' do
      expect(JSON.parse(response)).to have_key("items")
    end
  end
end