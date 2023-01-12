class Language < ApplicationRecord
  before_validation :add_slug
  has_many :repositories

  def add_slug
    self.slug = name.parameterize
  end

  def to_param
    slug
  end
end
