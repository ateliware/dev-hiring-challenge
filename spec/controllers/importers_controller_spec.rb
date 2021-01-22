# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImportersController, type: :controller do
  include ActiveJob::TestHelper

  describe 'POST #create' do
    subject { post :create }

    context 'when have referrer' do
      let!(:repository) { create(:repository) }
      before { request.env['HTTP_REFERER'] = repository_path(repository) }

      it 'enqueue job and redirect back to referrer page' do
        expect { subject }.to have_enqueued_job(GithubRepositoriesProcessJob).once
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(repository_path(repository))
      end
    end

    context 'when doesnt have referrer' do
      it 'enqueue job and redirect back to fallback location' do
        expect { subject }.to have_enqueued_job(GithubRepositoriesProcessJob).once
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(repositories_path)
      end
    end
  end
end
