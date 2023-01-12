class Language < ApplicationRecord
  before_validation :add_slug

  def add_slug
    self.slug = name.parameterize
  end

  def to_param
    slug
  end
end
