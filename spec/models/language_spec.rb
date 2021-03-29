require "rails_helper"

RSpec.describe Language, type: :model do
  describe 'associations' do
    it { should have_many(:repositories) }
  end
end
