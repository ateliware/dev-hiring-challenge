# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Repository, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:importer) }
    it { is_expected.to belong_to(:owner) }
  end
end
