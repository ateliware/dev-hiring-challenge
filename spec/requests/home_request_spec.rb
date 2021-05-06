require 'rails_helper'

RSpec.describe 'Homes', type: :request do

  describe 'GET /' do
    it 'returns http success' do
      get '/'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /search' do
    it 'returns http success' do
      post '/search', params: { input: { lang_java: 'on' } }

      expect(response).to redirect_to root_path
    end

    it 'return http error' do
      post '/search', params: {}

      expect(response.alert).to ''
    end
  end
end
