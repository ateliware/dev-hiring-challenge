class Organization < ApplicationRecord

  after_create :fetch_attributes

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
