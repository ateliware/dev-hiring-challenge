# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Github::RepositoriesProcessor do
  describe '.call', vcr: { record: :new_episodes } do
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
    
  end
end
