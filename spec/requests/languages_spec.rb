require 'rails_helper'

RSpec.describe "Languages", type: :request do
  let!(:language) { create(:language) }
  let(:language_id) { Language.first.id }

  describe "GET index" do
    before { get '/languages/index' }

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end 
  end 

  describe "POST update_repositories" do
    before { post "/languages/#{language_id}/update_repositories" }

    context "when the language exists" do
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when the language does not exist" do
      let(:language_id) { 123 }
      
      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end
    end
  end
end
