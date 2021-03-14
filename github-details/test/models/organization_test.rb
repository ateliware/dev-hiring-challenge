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
require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  test "it fetches its name" do

  end
end
