# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Owner, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:avatar_url) }
    it { is_expected.to validate_presence_of(:login) }
    it { is_expected.to validate_presence_of(:html_url) }
  end
end
