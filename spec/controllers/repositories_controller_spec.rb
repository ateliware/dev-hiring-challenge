require 'rails_helper'

RSpec.describe RepositoriesController do
  describe 'GET index' do
    it 'responds with status 200' do
      get :index
      expect(response.status).to eq(200)
    end

    context 'when not given a query string' do
      it 'assigns @repositories' do
        repositories = { 'items' => [] }
        get :index
        expect(assigns(:repositories)).to eq(repositories)
      end
    end

    describe 'GET show' do
      context 'when given a repository id parameter' do
        let(:repository_id) { '1' }

        it 'responds with status 200' do
          get :show, params: { id: repository_id }
          expect(response.status).to eq(200)
        end

        it 'attempts to find repository' do
          expect(Repository).to receive(:find_by).with(id: repository_id)
          get :show, params: { id: repository_id }
        end
      end
    end
  end
end
