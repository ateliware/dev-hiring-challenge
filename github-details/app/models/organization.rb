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
class Organization < ApplicationRecord
  after_create :fetch_attributes

  validates :slug, presence: true

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
