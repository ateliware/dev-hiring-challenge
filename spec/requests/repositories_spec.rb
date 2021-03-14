require 'rails_helper'

RSpec.describe "Repositories", type: :request do
  let!(:language) { create(:language) }
  let!(:repository) { create(:repository, language_id: language.id) }
  let(:repository_id) { repository.id }

  describe "GET /repositories/:id" do
    before { get "/repositories/#{repository_id}" }

    context "when repository exists" do
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end

      it "returns the requested repository" do
        result = JSON(response.body)
        expect(result['id']).to eq(repository_id)
      end
    end

    context "when repository does not exist" do
      let(:repository_id) { 123 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Repository/)
      end
    end
  end
end
