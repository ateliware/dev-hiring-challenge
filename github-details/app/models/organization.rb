# == Schema Information
#
# Table name: organizations
#
#  id          :bigint           not null, primary key
#  avatar_url  :string
#  description :string
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

  private

  def fetch_attributes
    org = Github.orgs.get slug

    update(
      name: org.name,
      description: org.description,
      avatar_url: org.avatar_url,
    )
  end
end
