# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Github::Base do
  describe '.default_languages' do
    subject { described_class.default_languages }

    it 'return the 5 default languages with language:lang name and +' do
      is_expected.to eq('language:ruby+language:php+language:elixir+language:python+language:go')
    end
  end
end
