require 'rails_helper'
require 'pp'
RSpec.describe RepositoriesController do
  describe "GET #index" do
    before do
      get :index
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "JSON body response contains expected recipe attributes" do
      json_response = JSON.parse(response.body)
      expect(json_response).first.to match_array([
          :node_id,
          :clone_url,
          :git_url,
          :ssh_url,
          :created_at,
          :updated_at,
          :pushed_at,
          :name,
          :full_name,
          :private,
          :owner,
          :html_url,
          :description,
          :svn_url,
          :homepage,
          :size,
          :language,
          :forks,
          :license
        ])
    end
  end
end