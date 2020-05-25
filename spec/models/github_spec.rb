require 'rails_helper'

RSpec.describe Github do
  describe '#search_repositories' do
    context 'when given an authorization token' do
      let(:token) { 'token' }

      context 'when given a query string' do
        let(:query_string) { 'language:ruby' }

        it "calls the HTTParty's get method with correct arguments" do
          github = Github.new(token)
          expect(Github).to receive(:get).with(
            "/search/repositories?q=#{query_string}",
            { headers: { 'Authorization' => "token #{token}" } }
          )
          github.search_repositories(query_string)
        end
      end
    end
  end

  describe '#repositories' do
    context 'when given an authorization token' do
      let(:token) { 'token' }

      context "when given a repository id" do
        let(:id) { 1 }

        it "calls the HTTPary's get method with correct arguments" do
          github = Github.new(token)
          expect(Github).to receive(:get).with(
            "/repositories/#{id}",
            { headers: { 'Authorization' => "token #{token}" } }
          )
          github.repositories(id)
        end
      end
    end
  end
end
