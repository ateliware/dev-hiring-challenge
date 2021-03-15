require 'rails_helper'

RSpec.describe FetchGithubJob, type: :job do
  include ActiveJob::TestHelper

  let!(:language) { create(:language, name: 'Ruby', code: 'ruby') }
  let(:job) { described_class.perform_later(language) }

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end

  describe "perform job" do
    it "queues the job" do
      expect { job }.to have_enqueued_job(FetchGithubJob).once.on_queue('default')
    end

    it "fetches and stores five repositories" do
      expect(Repository.count).to eq 0
      perform_enqueued_jobs { job }
      expect(Repository.count).to eq 5
      perform_enqueued_jobs { job }
      expect(Repository.count).to eq 5
    end
  end
end