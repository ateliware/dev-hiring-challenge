require 'rails_helper'
require 'webmock/rspec'

RSpec.describe RepositoriesController do
  describe "GET #index" do
    before do
      get :index
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "JSON body response contains node id,full name, git link, language attributes" do
      json_response = JSON.parse(response.body)
      expect(json_response.first['node_id']).not_to be_nil
      expect(json_response.first['full_name']).not_to be_nil
      expect(json_response.first['git_url']).not_to be_nil
      expect(json_response.first['language']).not_to be_nil
      
    end
  end

  describe "Consuming end point" do
    it "JSON body response result of endpoint" do

      uri = URI('https://api.github.com/search/repositories?q=language:Ruby')
      response = Net::HTTP.get(uri)
      expect(response).to be_an_instance_of(String)
    end

  end
  

end