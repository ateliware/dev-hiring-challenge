# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Importer, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:repositories).dependent(:destroy) }
  end
end
