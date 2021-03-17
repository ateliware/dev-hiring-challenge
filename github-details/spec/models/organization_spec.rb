# == Schema Information
#
# Table name: organizations
#
#  id          :bigint           not null, primary key
#  avatar_url  :string
#  blog        :string
#  description :string
#  is_verified :boolean          default(FALSE)
#  name        :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_organizations_on_slug  (slug) UNIQUE
#
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
