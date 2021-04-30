require 'rails_helper'

RSpec.describe Repo, type: :model do
  describe 'associations' do
    it { should belong_to(:topic) }
  end

  describe 'search_by_topics' do
    let(:topics) { 'ruby' }

    let(:api_endpoint) { "https://api.github.com/search/repositories?q=#{topics}%2Bis:featured&per_page=5" }

    let(:headers) {
      {
        'Accept'=>'application/vnd.github.v3+json',
        'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
        'Content-Type'=>'application/json',
        'User-Agent'=>'Octokit Ruby Gem 4.21.0'
      }
    }

    let(:api_response) { File.open(File.dirname(__FILE__) + '/fixtures/ruby.json').read }

    before(:each) do
      stub_request(:get, api_endpoint).
        with(headers: headers).
        to_return(status: 200, body: api_response, headers: {"Content-Type"=> "application/json"})

      Repo.search_by_topics(topics)
    end

    it 'should call Github API' do
      expect(WebMock).to have_requested(:get, api_endpoint).
        with(headers: headers).
        once
    end

    it 'should persist repositores on database' do
      expect(described_class.count).to eq(5)
    end
  end
end
