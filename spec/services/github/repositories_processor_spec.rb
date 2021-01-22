# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Github::RepositoriesProcessor do
  let(:importer) { create(:importer) }
  let(:repository_params) { JSON.parse(file_fixture('item.json').read) }
  let(:instance) { described_class.new(repository_params, importer, 1) }

  describe '.call', :vcr do
    subject { described_class.call }

    context 'when creating new records' do
      it 'creates a importer, creates needed owners, and insert all new repositories' do
        expect { subject }.to change(Importer, :count).by(1)
          .and change(Owner, :count).by(50)
          .and change(Repository, :count).by(50)
      end
    end

    context 'when already have some records' do
      before { described_class.call }

      it 'creates a importer, creates needed owners but only insert new repositories' do
        expect(Repository.count).to eq 50
        expect(Owner.count).to eq 48

        expect { subject }.to change(Importer, :count).by(1)
          .and change(Owner, :count).by(19)
          .and change(Repository, :count).by(22)

        expect(Repository.count).to eq(72)
        expect(Owner.count).to eq(67)
      end
    end
  end

  describe '#repository_attributes' do
    subject { described_class.new(repository_params, importer, 1).repository_attributes }

    context 'when owner exists' do
      let!(:owner) do
        create(:owner, login: repository_params['owner']['login'], avatar_url: repository_params['owner']['avatar_url'],
               html_url: repository_params['owner']['html_url'])
      end

      it 'returns needed attributes' do
        is_expected.to include({
          'name' => 'public-apis',
          'description' => 'A collective list of free APIs for use in software and web development.',
          'forks_count' => 13248,
          'full_name' => 'public-apis/public-apis',
          'html_url' => 'https://github.com/public-apis/public-apis',
          'language' => 'Python',
          'open_issues_count' => 234,
          'score' => 1.0,
          'stargazers_count' => 108357,
          'watchers_count' => 108357,
          github_repo_id: 54346799,
          importer_id: importer.id,
          owner_id: owner.id,
          position: 1
        })
      end

      it 'doesnt create a new owner' do
        expect { subject }.to not_change(Owner, :count)
      end
    end

    context 'when owner doesnt exists' do
      it 'returns needed attributes' do
        is_expected.to include({
          'name' => 'public-apis',
          'description' => 'A collective list of free APIs for use in software and web development.',
          'forks_count' => 13248,
          'full_name' => 'public-apis/public-apis',
          'html_url' => 'https://github.com/public-apis/public-apis',
          'language' => 'Python',
          'open_issues_count' => 234,
          'score' => 1.0,
          'stargazers_count' => 108357,
          'watchers_count' => 108357,
          github_repo_id: 54346799,
          importer_id: importer.id,
          position: 1
        })
      end

      it 'creates a new owner' do
        expect { subject }.to change(Owner, :count).by(1)
      end
    end
  end
end
