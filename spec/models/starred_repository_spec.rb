require "rails_helper"

RSpec.describe StarredRepository, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:repository) }
  end
end
