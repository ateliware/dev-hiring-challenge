require 'rails_helper'

RSpec.describe Organization, type: :model do
  let(:valid_attributes) {
    {
      slug: "python",
    }
  }

  describe "When creating a new organization" do
    it "updates its info from Github API" do
      organization = Organization.create! valid_attributes
      expect organization.reload.name.to exist
    end
  end
end
