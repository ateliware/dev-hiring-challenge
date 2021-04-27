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

    describe "Post #create" do
      before do
        post :create, params: { :repository => {
          :id => 26783234, :node_id => 'MDEwOlJlcG9zaXRvcnk', :name => 'kong',:full_name => 'Kong/kong',
          :homepage => 'https://konghq.com/install',:html_url => 'https://github.com/Kong/kong',
          :ssh_url => 'git@github.com:Kong/kong.git',:git_url =>'git://github.com/Kong/kong.git',
          :clone_url => "https://github.com/Kong/kong.git", 
          :svn_url => 'https://github.com/Kong/kong', :description => 'The Cloud-Native API Gateway ',
          :forks => 3793, :language => 'Lua', :size  => 28809}}
      end

      it "returns http success" do
        expect(response).to have_http_status(:created)
      end
  end
end