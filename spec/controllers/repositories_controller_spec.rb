# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RepositoriesController, type: :controller do
  describe 'GET #index' do
    let!(:repositories) { create_list(:repository, 10, :rand) }

    it 'response success' do
      get :index

      expect(response).to be_successful
      expect(response).to render_template(:index)
      expect(assigns(:repositories)).to match_array(repositories)
    end
  end

  describe 'GET #show' do
    subject { get :show, params: { id: repository.to_param } }

    context 'when repository exists' do
      let!(:repository) { create(:repository) }

      it 'returns success' do
        subject

        expect(response).to be_successful
        expect(response).to render_template(:show)
        expect(assigns(:repository)).to eq repository
      end
    end

    context 'when repository doesnt exists' do
      let!(:repository) { build(:repository, name: 'django', id: 503) }

      it 'returns 404' do
        expect { subject }.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end
  end
end
