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
class Organization < ApplicationRecord
  after_create :fetch_attributes

  validates :slug, presence: true, uniqueness: true

  def to_param
    slug
  end

  def from_api
    Github.orgs.get slug
  end

  private

  def fetch_attributes
    update(
      name: from_api.name,
      description: from_api.description,
      avatar_url: from_api.avatar_url,
      blog: from_api.blog,
      is_verified: from_api.is_verified,
    )
  end
end
