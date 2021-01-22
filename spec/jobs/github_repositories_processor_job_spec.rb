# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubRepositoriesProcessJob, type: :job do
  include ActiveJob::TestHelper
  subject { described_class.perform_later }

  describe '#perform' do
    it 'queues the job' do
      expect { subject }.to have_enqueued_job(GithubRepositoriesProcessJob).once.on_queue('default')
    end

    it 'executes perform', :vcr do
      expect(Importer.count).to eq 0
      expect(Repository.count).to eq 0
      expect(Owner.count).to eq 0

      perform_enqueued_jobs { subject }

      expect(Importer.count).to eq 1
      expect(Repository.count).to eq 50
      expect(Owner.count).to eq 49
    end
  end

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end
end
